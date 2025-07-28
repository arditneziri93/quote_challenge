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
import { QuotesService } from './quote.service';
import { Quote } from '../entity/quote.entity';
import { QuoteRequestDto } from '../dto/quote.dto';

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
  create(@Body() dto: QuoteRequestDto): Promise<Quote> {
    return this.quotesService.create(dto);
  }

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() dto: QuoteRequestDto,
  ): Promise<Quote> {
    return this.quotesService.update(+id, dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<string> {
    const removed = await this.quotesService.remove(+id);
    if (!removed) {
      throw new NotFoundException(`Quote with ID "${id}" not found`);
    }
    return '{}';
  }
}
