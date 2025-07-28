import { IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class QuoteRequestDto {
  @IsString()
  quote: string;

  @IsString()
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

  constructor(id: number, quote: string, author: string) {
    this.id = id;
    this.quote = quote;
    this.author = author;
  }
}
