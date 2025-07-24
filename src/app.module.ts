import { Module } from '@nestjs/common';
import { QuotesModule } from './quote/quote.module';

@Module({
  imports: [QuotesModule],
})
export class AppModule {}
