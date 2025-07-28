/* eslint-disable  */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/user.service'; // Import your UsersService

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Set to true if you want to allow expired tokens (not recommended for most cases)
      secretOrKey: process.env.JWT_SECRET || 'your_secret_key', // MUST match the secret used in JwtModule.register
    });
  }

  async validate(payload: any): Promise<{ userId: number; username: string }> {
    // This 'payload' is the decoded JWT payload
    // You can fetch the user from your database here using payload.sub (user ID)
    // or return the payload directly if all necessary user info is in the token.
    const user = await this.usersService.findOne(payload.sub); // Assuming findById exists and fetches the user
    if (!user) {
      // This should ideally not happen if the token is valid and signed by you
      // and the user still exists in the DB.
      // You might throw an UnauthorizedException here if the user doesn't exist.
      console.log('user is nonexistent');
    }
    return {
      userId: payload.sub,
      username: payload.username,
      //roles: payload.roles,
    }; // This object will be attached to req.user
  }
}
