import { IsString } from 'class-validator';

export class CreateNodeInput {
  @IsString()
  parent: string;

  @IsString()
  label: string;
}
