import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalTreeEntity } from 'src/animal-tree/animal-tree.entity';
import { AnimalNode } from 'src/utils/fake-database/interfaces/animal-node';
import { Repository } from 'typeorm';

@Injectable()
export class AnimalTreeService {
  constructor(
    @InjectRepository(AnimalTreeEntity)
    private animalTreeEntityRepository: Repository<AnimalTreeEntity>,
  ) {}

  private async addData(node: AnimalNode, parent?: AnimalTreeEntity) {
    const parentAnimalTree = this.animalTreeEntityRepository.create();

    parentAnimalTree.id = node.id;
    parentAnimalTree.label = node.label;
    parentAnimalTree.parent = parent;
    parentAnimalTree.children = [];

    await this.animalTreeEntityRepository.save(parentAnimalTree);

    await Promise.all(
      node.children.map((value) => this.addData(value, parentAnimalTree)),
    );
  }

  async insertData(animalNode: AnimalNode) {
    return this.addData(animalNode);
  }
}
