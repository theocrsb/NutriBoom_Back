import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateActivityDto {
  name: string;
  conso_cal_1h: number;
  validate: boolean;
}
