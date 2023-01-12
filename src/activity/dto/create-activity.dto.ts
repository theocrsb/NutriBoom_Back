import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  name: string;
  @IsNumber()
  conso_cal_1h: number;
  @IsBoolean()
  validate: boolean;
}
