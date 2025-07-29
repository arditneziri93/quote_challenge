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
import { QuotesService } from './quote.service';
import { Quote } from '../entity/quote.entity';
import { QuoteRequestDto, QuoteResponseDto } from '../dto/quote.dto';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get('/')
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('pageSize', new ParseIntPipe({ optional: true })) pageSize?: number,
    @Query('randomized', new ParseBoolPipe({ optional: true }))
    randomize?: boolean,
  ): Promise<QuoteResponseDto[]> {
    let quotes: Quote[] = [];
    if (randomize) {
      quotes = await this.quotesService.findRandom();
    } else {
      quotes = await this.quotesService.findAll(page, pageSize);
    }
    const responseQuotes: QuoteResponseDto[] = [];
    for (const quote of quotes) {
      const responseQuote = plainToInstance(QuoteResponseDto, quote, {
        strategy: 'excludeAll',
      });
      responseQuotes.push(responseQuote);
    }
    return responseQuotes;
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<QuoteResponseDto> {
    try {
      const quote = await this.quotesService.findOne(+id);
      const responseQuote = plainToInstance(QuoteResponseDto, quote, {
        strategy: 'excludeAll',
      });
      return responseQuote;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('404');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() dto: QuoteRequestDto): Promise<QuoteResponseDto> {
    const quote = await this.quotesService.create(dto);
    const responseQuote = plainToInstance(QuoteResponseDto, quote, {
      strategy: 'excludeAll',
    });
    return responseQuote;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: QuoteRequestDto,
  ): Promise<QuoteResponseDto> {
    const quote = await this.quotesService.update(+id, dto);
    const responseQuote = plainToInstance(QuoteResponseDto, quote, {
      strategy: 'excludeAll',
    });
    return responseQuote;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const removed = await this.quotesService.remove(+id);
    if (!removed) {
      throw new NotFoundException(`Quote with ID "${id}" not found`);
    }
  }
}
