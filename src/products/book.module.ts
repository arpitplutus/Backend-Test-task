import { Module } from '@nestjs/common';
import { ProductsService } from './book.service';
import { ProductsController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { books } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([books])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
