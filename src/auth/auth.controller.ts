import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Public } from '../common/decorators/public.decorator';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public() // Mark login as public
  @UseGuards(AuthGuard('local')) // Use the 'local' strategy for authentication
  @Post('login')
  login(@Request() req, @Body() loginDto: LoginDto) {
    // @Body() is optional if you only care about req.user
    // Passport's LocalStrategy attaches the validated user to req.user
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.authService.login(req.user);
  }
}
