import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/user.service'; // Adjust path if needed
import * as bc from 'bcrypt'; // For password comparison
import { User } from '../entity/user.entity';
import { UserResponseDto } from '../dto/user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    userEmail: string,
    pass: string,
  ): Promise<UserResponseDto> {
    const user: User = await this.userService.findByUserEmail(userEmail); // Assuming you have this method in UserService
    // eslint-disable-next-line
    const result: boolean = await bc.compare(pass, user.password);
    if (user && result) {
      // Compare hashed password
      const responseUser = plainToInstance(UserResponseDto, user, {
        strategy: 'excludeAll',
      });
      // Exclude password from the returned object
      return responseUser;
    }
    return null;
  }

  login(user: UserResponseDto) {
    const payload = {
      userEmail: user.email,
      sub: user.id,
      //roles: user.roles,
    }; // Customize payload with user data
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
