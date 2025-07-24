import { Module } from '@nestjs/common';
import { QuotesService } from './quote.service';
import { QuotesController } from './quote.controller';
import { QuoteRepository } from './quote.repository';

@Module({
  controllers: [QuotesController],
  providers: [QuotesService, QuoteRepository],
})
export class QuotesModule {}
