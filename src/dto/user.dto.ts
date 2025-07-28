import { IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class UserRequestDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class UserResponseDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  email: string;

  constructor(id: number, email: string) {
    this.id = id;
    this.email = email;
  }
}
