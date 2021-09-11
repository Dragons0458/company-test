import { Entity, Tree, Column, TreeChildren, TreeParent } from 'typeorm';

@Entity()
@Tree('closure-table')
export class AnimalTreeEntity {
  @Column()
  id: string;

  @Column()
  label: string;

  @TreeChildren()
  children: AnimalTreeEntity[];

  @TreeParent()
  parent: AnimalTreeEntity;
}
