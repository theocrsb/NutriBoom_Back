import { IsBoolean, IsInt, IsNumber, IsString } from 'class-validator';

export class CreateActivityDto {
  name: string;
  conso_cal_1h: number;
  validate: boolean;
}
