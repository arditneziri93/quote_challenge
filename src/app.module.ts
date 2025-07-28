import { Module } from '@nestjs/common';
import { QuotesModule } from './quote/quote.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './entity/quote.entity';
import { UsersModule } from './user/user.module';
import { User } from './entity/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // <--- Specify your database type here
      database: 'database.sqlite', // <--- Path to your DB file (for SQLite) or database name

      entities: [Quote, User], // <--- **IMPORTANT:** This array will hold your Entity classes (e.g., [User, Product])
      //     You can also use a glob pattern like ['dist/**/*.entity{.ts,.js}']
      //     but explicitly listing them is often clearer for smaller projects.

      synchronize: true, // <--- **CAUTION: USE ONLY IN DEVELOPMENT!**
      //     This automatically creates/updates your database schema based on entities.
      //     **NEVER use in production** as it can lead to data loss.
      //     Use TypeORM Migrations for production schema changes.

      logging: false, // Set to 'all' or true to see SQL queries in the console (useful for debugging)
    }),

    QuotesModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
