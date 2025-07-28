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
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from '../entity/user.entity';
import { UserRequestDto } from '../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('pageSize', new ParseIntPipe({ optional: true })) pageSize?: number,
    @Query('randomized', new ParseBoolPipe({ optional: true }))
    randomize?: boolean,
  ): Promise<User[]> {
    let users: User[];
    if (randomize) {
      users = await this.usersService.findRandom();
    } else {
      users = await this.usersService.findAll(page, pageSize);
    }
    return users;
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<User> {
    try {
      return await this.usersService.findOne(+id);
    } catch (error) {
      throw new NotFoundException('404');
      console.log(error);
    }
  }

  @Post('/')
  create(@Body() dto: UserRequestDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() dto: UserRequestDto): Promise<User> {
    return this.usersService.update(+id, dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<string> {
    const removed = await this.usersService.remove(+id);
    if (!removed) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return '{}';
  }
}
