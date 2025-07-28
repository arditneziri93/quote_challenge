import {
  BadRequestException,
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
import { QuotesService } from './quote.service';
import { Quote } from '../entity/quote.entity';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get('/')
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('pageSize', new ParseIntPipe({ optional: true })) pageSize?: number,
    @Query('randomized', new ParseBoolPipe({ optional: true }))
    randomize?: boolean,
  ): Promise<Quote[]> {
    let quotes;
    if (randomize) {
      quotes = await this.quotesService.findRandom();
    } else {
      quotes = await this.quotesService.findAll(page, pageSize);
    }
    return quotes as Quote[];
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<Quote> {
    try {
      return await this.quotesService.findOne(+id);
    } catch (error) {
      throw new NotFoundException('404');
      console.log(error);
    }
  }

  @Post('/')
  create(@Body() quote: Quote): Promise<Quote> {
    if (quote.id || quote.id === 0) {
      throw new BadRequestException('400');
    }
    return this.quotesService.create(quote);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() quote: Quote): Promise<Quote> {
    return this.quotesService.update(+id, quote);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const removed = await this.quotesService.remove(+id);
    if (!removed) {
      throw new NotFoundException(`Quote with ID "${id}" not found`);
    }
  }
}
