import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalTreeEntity } from 'src/animal-tree/animal-tree.entity';
import { AnimalTreeService } from './animal-tree.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalTreeEntity])],
  providers: [AnimalTreeService],
  exports: [AnimalTreeService],
})
export class AnimalTreeModule {}
