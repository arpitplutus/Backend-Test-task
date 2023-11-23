import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { BooksModule } from './Book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'booksstore',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BooksModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
