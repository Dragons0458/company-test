import { HttpException } from '@nestjs/common';
import { AnimalNode } from 'src/fake-database/interfaces/animal-node';
import { v4 as uuidv4 } from 'uuid';

export class Database {
  private data: AnimalNode = {
    id: '1',
    label: 'root',
    children: [],
  };

  private indexedData = new Map<string, AnimalNode>([
    [this.data.id, this.data],
  ]);
  private indexedParents = new Map<string, AnimalNode>([
    [this.data.id, undefined],
  ]);

  private indexData(node: AnimalNode) {
    this.indexedData.set(node.id, node);

    for (const child of node.children) {
      this.indexedParents.set(child.id, node);

      this.indexData(child);
    }
  }

  get currentAnimalNode(): AnimalNode {
    return this.data;
  }

  static getUniqueIndex(): string {
    return uuidv4();
  }

  populateData(node: AnimalNode) {
    this.data = node;

    this.indexData(node);
  }

  getNode(nodeId: string): AnimalNode {
    if (!this.indexedData.has(nodeId))
      throw new HttpException("The node doesn't exists", 404);

    return this.indexedData.get(nodeId);
  }

  addNode(parentId: string, node: AnimalNode) {
    if (!this.indexedData.has(parentId))
      throw new HttpException("The parent node doesn't exists", 404);

    const parentNode = this.indexedData.get(parentId);

    this.indexedParents.set(node.id, parentNode);
    this.indexData(node);

    parentNode.children.push(node);
  }

  updateParentNode(nodeId: string, newParentId: string) {
    if (!this.indexedData.has(nodeId) || !this.indexedData.has(newParentId))
      throw new HttpException("Some of the node ids don't exist", 404);

    const currParentNode = this.indexedParents.get(nodeId);
    const currParentChildren = currParentNode.children;
    let currIndexNodeInChildren: number;
    let currNodeInChildren: AnimalNode;

    for (let index = 0; index < currParentChildren.length; index++) {
      const value = currParentChildren[index];

      if (value.id === nodeId) {
        currIndexNodeInChildren = index;
        currNodeInChildren = value;
        break;
      }
    }

    currParentChildren.splice(currIndexNodeInChildren, 1);

    const newParentNode = this.indexedParents.get(newParentId);

    this.indexedData.get(newParentId).children.push(currNodeInChildren);
    this.indexedParents.set(nodeId, newParentNode);
  }

  deleteNode(nodeId: string) {
    if (!this.indexedParents.has(nodeId))
      throw new HttpException("The node doesn't exists", 404);

    const parentChildren = this.indexedParents.get(nodeId).children;

    const indexNodeInChildren = parentChildren.findIndex(
      (value) => value.id === nodeId,
    );

    parentChildren.splice(indexNodeInChildren, 1);
  }
}
