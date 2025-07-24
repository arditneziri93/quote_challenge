import { QuotesService } from './quote.service';
export declare class QuotesController {
    private readonly quotesService;
    constructor(quotesService: QuotesService);
    findAll(): string;
    findRandom(): string;
}
