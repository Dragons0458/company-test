import {
  BeforeApplicationShutdown,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { AnimalTreeService } from 'src/animal-tree/animal-tree.service';
import { CreateNodeInput } from 'src/utils/classes/create-node-input';
import { UpdateNodeInput } from 'src/utils/classes/update-node-input';
import { Database } from 'src/utils/fake-database/classes/database';
import { data } from 'src/utils/fake-database/initial-data';
import { AnimalNode } from 'src/utils/fake-database/interfaces/animal-node';
import { Node } from 'src/utils/interfaces/node';
import { TreeNode } from 'src/utils/interfaces/tree-node';
import { databaseInstance } from 'src/utils/fake-database';

@Injectable()
export class AppService implements BeforeApplicationShutdown {
  //constructor(private readonly animalTreeService: AnimalTreeService) {}

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

  async beforeApplicationShutdown(signal?: string) {
    // await this.animalTreeService.insertData(databaseInstance.currentAnimalNode);
  }
}
