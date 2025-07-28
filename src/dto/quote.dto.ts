import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class QuoteRequestDto {
  @IsString()
  quote: string;

  @IsString()
  author: string;
}

export class QuoteResponseDto {
  @IsString()
  @Expose()
  quote: string;

  @IsString()
  author: string;
}
