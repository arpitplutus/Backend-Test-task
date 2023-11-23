import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([book])],
  controllers: [BookController],
  providers: [BookService],
})
export class BooksModule {}
