import { IsString } from 'class-validator';

export class FindIdParam {
  @IsString()
  id: string;
}
