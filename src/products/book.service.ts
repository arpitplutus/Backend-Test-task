import {
  Injectable,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-book.dto';
import { UpdateProductDto } from './dto/update-book.dto';
import { Like, Repository } from 'typeorm';
import { products } from './entities/book.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(products)
    private readonly productRepository: Repository<products>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const petsDetails = this.productRepository.create(createProductDto);
    await this.productRepository.save(petsDetails);
    return {
      msg: 'Data Added successfully',
      status: HttpStatus.OK,
      data: petsDetails,
    };
  }

  async findAll() {
    const findAll = await this.productRepository.findAndCount({
      where: {
        isDeleted: false,
      },
    });
    if (!findAll) throw new BadRequestException({ error: 'Data Not Found' });
    return {
      status: HttpStatus.OK,
      messsage: 'Data fetch successfully',
      totalData: findAll && findAll.length ? findAll[1] : 0,
      result: findAll && findAll[0],
    };
  }

  async findOne(id: any) {
    const findOne = await this.productRepository.findOne({
      where: {
        id: id,
        isDeleted: false,
      },
    });
    if (!findOne) throw new BadRequestException({ error: 'Data Not Found' });
    return {
      status: HttpStatus.OK,
      messsage: 'Data fetch successfully',
      result: findOne,
    };
  }

  async update(id: any, updateProductDto: UpdateProductDto) {
    try {
      const existingProduct: any = await this.productRepository.findOne({
        where: {
          id: id,
          isDeleted: false,
        },
      });

      if (!existingProduct) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      const result: any = await this.productRepository.update(
        existingProduct,
        updateProductDto,
      );
      return {
        status: HttpStatus.OK,
        message: 'Data updated successfully',
        totalData: result && result.affected ? result.affected : 0,
        result: result,
      };
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async remove(id: any) {
    const result: any = await this.productRepository.delete(id);
    return {
      status: HttpStatus.OK,
      messsage: 'Data deleted successfully',
      totalData: result && result.length ? result.length : 0,
      result: result,
    };
  }

  async softDelete(id: any) {
    const product = await this.productRepository.findOne({
      where: {
        id: id,
        isDeleted: false,
      },
    });
    if (!product) {
      throw new BadRequestException({ error: 'Product not found.' });
    }
    product.isDeleted = true;
    await this.productRepository.save(product);
    return {
      status: HttpStatus.OK,
      message: 'Soft delete successful',
    };
  }

  async search(query: string) {
    const searchResults = await this.productRepository.findAndCount({
      where: [
        { title: Like(`%${query}%`), isDeleted: false },
        { description: Like(`%${query}%`), isDeleted: false },
        { author: Like(`%${query}%`), isDeleted: false },
        { isbn: Like(`%${query}%`), isDeleted: false },
      ],
    });
    if (!searchResults) {
      throw new NotFoundException({ error: 'No matching data found.' });
    }
    return {
      status: HttpStatus.OK,
      message: 'Search results fetched successfully',
      totalResults: searchResults.length,
      results: searchResults,
    };
  }
}
