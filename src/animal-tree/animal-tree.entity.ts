import {
  Entity,
  Tree,
  Column,
  TreeChildren,
  TreeParent,
  PrimaryColumn,
} from 'typeorm';

@Entity()
@Tree('closure-table')
export class AnimalTreeEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  label: string;

  @TreeChildren()
  children: AnimalTreeEntity[];

  @TreeParent()
  parent: AnimalTreeEntity;
}
