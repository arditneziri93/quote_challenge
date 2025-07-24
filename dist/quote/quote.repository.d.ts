import { Quote } from './quote.entity';
export declare class QuoteRepository {
    loadAll(): Promise<Quote[]>;
}
