import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from '../entity/user.entity';
import { UserRequestDto, UserResponseDto } from '../dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('pageSize', new ParseIntPipe({ optional: true })) pageSize?: number,
    @Query('randomized', new ParseBoolPipe({ optional: true }))
    randomize?: boolean,
  ): Promise<UserResponseDto[]> {
    let users: User[];
    if (randomize) {
      users = await this.usersService.findRandom();
    } else {
      users = await this.usersService.findAll(page, pageSize);
    }
    const responseUsers: UserResponseDto[] = [];
    for (const user of users) {
      const responseUser = plainToInstance(UserResponseDto, user, {
        strategy: 'excludeAll',
      });
      responseUsers.push(responseUser);
    }
    return responseUsers;
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    try {
      const user = await this.usersService.findOne(+id);
      const responseUser = plainToInstance(UserResponseDto, user, {
        strategy: 'excludeAll',
      });
      return responseUser;
    } catch (error) {
      throw new NotFoundException('404');
      console.log(error);
    }
  }

  @Post('/')
  async create(@Body() dto: UserRequestDto): Promise<UserResponseDto> {
    const user = await this.usersService.create(dto);
    const responseUser = plainToInstance(UserResponseDto, user, {
      strategy: 'excludeAll',
    });
    return responseUser;
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UserRequestDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.update(+id, dto);
    const responseUser = plainToInstance(UserResponseDto, user, {
      strategy: 'excludeAll',
    });
    return responseUser;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const removed = await this.usersService.remove(+id);
    if (!removed) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }
}
