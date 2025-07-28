import { IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class UserRequestDto {
  @IsString()
  @Expose()
  email: string;

  @IsString()
  @Expose()
  password: string;
}

export class UserResponseDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  email: string;
}
