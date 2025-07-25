import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { QuotesService } from './quote.service';
import { Quote } from '../entity/quote.entity';

@Controller()
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get('/all')
  async findAll(@Query('page',new  ParseIntPipe({ optional: true })) page?: number): Promise<Quote[]> {
    const quotes = await this.quotesService.findAll(page);
    return quotes;
  }

  @Get('/')
  async findRandom(): Promise<Quote> {
    const randomQuote = await this.quotesService.findRandom();
    return randomQuote;
  }

  @Get('/single-quote/:id')
  async findOne(@Param('id') id: string): Promise<Quote> {
    try {
      return await this.quotesService.findOne(+id);
    } catch (error) {
      throw new NotFoundException('404');
      console.log(error);
    }
  }

  @Post('/add-quote')
  create(@Body() quote: Quote): Promise<Quote> {
    return this.quotesService.create(quote);
  }

  @Put('/update-quote/:id')
  update(@Param('id') id: string, @Body() quote: Quote): Promise<Quote> {
    return this.quotesService.update(+id, quote);
  }

  @Delete('/delete-quote/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.quotesService.remove(+id);
  }
}
