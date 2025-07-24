import { Injectable, OnModuleInit } from '@nestjs/common';
import { Quote } from './quote.entity';
import { QuoteRepository } from './quote.repository';

@Injectable()
export class QuotesService implements OnModuleInit {
  private quotes: Quote[] = [];

  constructor(private readonly repo: QuoteRepository) {}

  async onModuleInit() {
    this.quotes = await this.repo.loadAll();
  }

  findAll(): Quote[] {
    return this.quotes;
  }

  findRandom(): Quote {
    const index = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[index];
  }
}
