import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalTreeEntity } from 'src/animal-tree/animal-tree.entity';
import { AnimalTreeModule } from 'src/animal-tree/animal-tree.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  /*imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8080,
      username: 'root',
      password: 'asd123.',
      database: 'test',
      entities: [AnimalTreeEntity],
      synchronize: true,
    }),
    AnimalTreeModule,
  ],*/
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
