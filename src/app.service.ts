import { HttpException, Injectable } from '@nestjs/common';
import { CreateNodeInput } from 'src/classes/create-node-input';
import { UpdateNodeInput } from 'src/classes/update-node-input';
import { Database } from 'src/fake-database/classes/database';
import { AnimalNode } from 'src/fake-database/interfaces/animal-node';
import { Node } from 'src/interfaces/node';
import { TreeNode } from 'src/interfaces/tree-node';
import { databaseInstance } from 'src/fake-database';

@Injectable()
export class AppService {
  private animalNodeToTreeNode(animalNode: AnimalNode): TreeNode {
    const node: Node = {
      label: animalNode.label,
      children: [],
    };

    const treeToReturn: TreeNode = {
      [animalNode.id]: node,
    };

    for (const child of animalNode.children) {
      const transform = this.animalNodeToTreeNode(child);

      node.children.push(transform);
    }

    return treeToReturn;
  }

  getTree(): TreeNode {
    return this.animalNodeToTreeNode(databaseInstance.currentAnimalNode);
  }

  addNode(createNodeInput: CreateNodeInput) {
    databaseInstance.addNode(createNodeInput.parent, {
      id: Database.getUniqueIndex(),
      label: createNodeInput.label,
      children: [],
    });
  }

  deleteNode(nodeId: string) {
    const node = databaseInstance.getNode(nodeId);

    if (node.children.length > 0)
      throw new HttpException(
        "The node hasn't delete because has children",
        400,
      );

    databaseInstance.deleteNode(nodeId);
  }

  updateNode(nodeId: string, updateNodeInput: UpdateNodeInput) {
    databaseInstance.updateParentNode(nodeId, updateNodeInput['current-id']);
  }
}
