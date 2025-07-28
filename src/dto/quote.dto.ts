import { IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class QuoteRequestDto {
  @IsString()
  @Expose()
  quote: string;

  @IsString()
  @Expose()
  author: string;
}

export class QuoteResponseDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  quote: string;

  @IsString()
  @Expose()
  author: string;
}
