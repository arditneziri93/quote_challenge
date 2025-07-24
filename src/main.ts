import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
/*
import * as fs from 'fs/promises';
import * as path from 'path';
import { QuotesService } from './quote/quote.service';
import { Quote } from './entity/quote.entity';
*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
  const quotesService = app.get(QuotesService);
  console.log('✅ Bootstrapping...');
  // Seed only if DB is empty
  const count = (await quotesService.findAll()).length;
  if (count === 0) {
    const dataPath = path.join(__dirname, './quote/quotes.json');
    const raw = await fs.readFile(dataPath, 'utf-8');
    const quotes = JSON.parse(raw) as Quote[];
    for (const quote of quotes) {
      await quotesService.create(quote);
    }
    console.log('✅ Dummy data seeded.');
  }
  */

  await app.listen(3006);
}
bootstrap();
