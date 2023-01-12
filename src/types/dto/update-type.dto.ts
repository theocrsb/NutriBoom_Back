import { IsString } from 'class-validator';

export class UpdateTypeDto {
  @IsString()
  name: string;
}
