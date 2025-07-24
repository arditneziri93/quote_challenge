import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { Quote } from './quote.entity';

const PATH = path.join(__dirname, '../quote/quotes.json');

@Injectable()
export class QuoteRepository {
  async loadAll(): Promise<Quote[]> {
    try {
      const data = await fs.readFile(PATH, 'utf-8');
      return JSON.parse(data) as Quote[];
    } catch (err) {
      console.error(err);
      throw new Error('Could not load quotes');
    }
  }
}
