import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalTreeEntity } from 'src/animal-tree/animal-tree.entity';
import { AnimalTreeModule } from 'src/animal-tree/animal-tree.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USERNAME'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [AnimalTreeEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AnimalTreeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
