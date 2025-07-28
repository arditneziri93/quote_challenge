import { Module } from '@nestjs/common';
import { QuotesService } from './quote.service';
import { QuotesController } from './quote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from '../entity/quote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quote])],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
