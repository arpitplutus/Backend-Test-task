import { Module } from '@nestjs/common';
import { ProductsService } from './book.service';
import { ProductsController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { products } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([products])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
