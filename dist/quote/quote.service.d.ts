import { OnModuleInit } from '@nestjs/common';
import { Quote } from './quote.entity';
import { QuoteRepository } from './quote.repository';
export declare class QuotesService implements OnModuleInit {
    private readonly repo;
    private quotes;
    constructor(repo: QuoteRepository);
    onModuleInit(): Promise<void>;
    findAll(): Quote[];
    findRandom(): Quote;
}
