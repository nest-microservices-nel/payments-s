import { IsString } from 'class-validator';

export class createPaymentSessionDto {
  @IsString()
  data: string;
}
