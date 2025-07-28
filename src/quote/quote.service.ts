import { Injectable } from '@nestjs/common';
import { Quote } from '../entity/quote.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private repo: Repository<Quote>,
  ) {}

  async findAll(page?: number, pageSize?: number): Promise<Quote[]> {
    const realPage = page ?? 1;
    const realPageSize = pageSize ?? 10;
    const skip = realPageSize * (realPage - 1);
    return this.repo.find({
      skip,
      take: realPageSize,
    });
  }

  async findRandom(pageSize?: number): Promise<Quote[]> {
    const realPageSize = pageSize ?? 1;
    const quotes = await this.repo.find();
    const RealQuotes = this.shuffle(quotes);
    return RealQuotes.slice(0, realPageSize);
  }

  private shuffle(quotes: Quote[]) {
    let index = quotes.length,
      j: number,
      temp: Quote;
    while (--index > 0) {
      j = Math.floor(Math.random() * (index + 1));
      temp = quotes[j];
      quotes[j] = quotes[index];
      quotes[index] = temp;
    }
    return quotes;
  }

  async findOne(id: number): Promise<Quote | undefined> {
    const result = await this.repo.findOne({ where: { id } });
    if (!result) throw Error('notfound');
    return result;
  }

  async create(user: Partial<Quote>): Promise<Quote> {
    const newQuote = this.repo.create(user); // Creates a new entity instance (not yet saved to DB)
    return this.repo.save(newQuote); // Saves the instance to the database
  }

  async update(id: number, user: Partial<Quote>): Promise<Quote | undefined> {
    await this.repo.update(id, user); // Updates by ID directly
    return this.repo.findOne({ where: { id } }); // Returns the updated user
  }

  // Deletes by ID
  async remove(id: number): Promise<boolean> {
    const deleted = await this.repo.delete(id);
     if (deleted.affected > 0) {
      return true;
    }
    return false;
  }
}
