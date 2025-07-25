import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { QuotesService } from './quote.service';
import { Quote } from '../entity/quote.entity';

@Controller()
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  //   @Get('/all')
  //   async findAll(): Promise<string> {
  //     const quotes = await this.quotesService.findAll();
  //     return `<div style="
  //     display: flex;
  //     flex-direction: column;
  //     justify-content: center;
  //     align-items: center;
  //     height: 100vh;
  //     gap: 100px;
  //   ">
  //     ${quotes
  //       .map(
  //         (q) => `
  //       <div style="text-align: center">
  //         <h3>${q.quote}</h3>
  //         <p>– ${q.author}</p>
  //       </div>
  //     `,
  //       )
  //       .join('')}
  // </div>`;
  //   }

  @Get('/all')
  async findAll(): Promise<Quote[]> {
    const quotes = await this.quotesService.findAll();
    return quotes;
  }

  // @Get('/')
  // async findRandom(): Promise<string> {
  //   const q = await this.quotesService.findRandom();
  //   return `
  //   <div style="
  //     display: flex;
  //     justify-content: center;
  //     align-items: center;
  //     height: 100vh;
  //     text-align: center;
  //     flex-direction: column;
  //     gap: 1rem;
  //     background-image: url('https://media1.tenor.com/m/B7vSc-79QXAAAAAd/mindblow-mind-explosion.gif');
  //     background-size: cover;
  //     background-position: center;
  //     color: white;
  //     padding: 2rem;
  //   ">
  //     <h1>${q.quote}</h1>
  //     <p>– ${q.author}</p>
  //   </div>
  // `;
  // }

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
