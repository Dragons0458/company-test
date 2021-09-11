import { IsString } from 'class-validator';

export class UpdateNodeInput {
  @IsString()
  'current-id': string;
}
