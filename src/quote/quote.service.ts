import { Injectable } from '@nestjs/common';
import { Quote } from '../entity/quote.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuotesService {
  private quotes: Quote[] = [];

  constructor(
    @InjectRepository(Quote)
    private repo: Repository<Quote>,
  ) {}

  async findAll(page?: number,pageSize?: number): Promise<Quote[]> {
    const realPage = page ?? 1;
    const realPageSize = pageSize ?? 10;
    const skip = realPageSize * (realPage - 1);
    return this.repo.find({
      skip,
      take: realPageSize
    });
  }

  async findRandom(): Promise<Quote> {
    const quotes = await this.repo.find();
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  }

  async findOne(id: number): Promise<Quote | undefined> {
    const result = await this.repo.findOneById(id);
    console.log(result);
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

  async remove(id: number): Promise<void> {
    await this.repo.delete(id); // Deletes by ID
  }
}
