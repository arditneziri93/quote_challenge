import { Controller, Get } from '@nestjs/common';
import { QuotesService } from './quote.service';

@Controller('/')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get('/all')
  findAll(): string {
    const quotes = this.quotesService.findAll();
    return `<div style="
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    gap: 100px;
  ">
    ${quotes
      .map(
        (q) => `
      <div style="text-align: center">
        <h3>${q.quote}</h3>
        <p>– ${q.author}</p>
      </div>
    `,
      )
      .join('')}
</div>`;
  }

  @Get('/')
  findRandom(): string {
    const quote = this.quotesService.findRandom();
    return `
    <div style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
      flex-direction: column;
      gap: 1rem;
      background-image: url('https://media1.tenor.com/m/B7vSc-79QXAAAAAd/mindblow-mind-explosion.gif');
      background-size: cover;
      background-position: center;
      color: white;
      padding: 2rem;
    ">
      <h1>${quote.quote}</h1>
      <p>– ${quote.author}</p>
    </div>
  `;
  }
}
