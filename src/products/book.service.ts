import { Injectable, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-book.dto';
import { UpdateProductDto } from './dto/update-book.dto';
import { Like, Repository } from 'typeorm';
import { books } from './entities/book.entity'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(books) 
    private readonly productRepository: Repository<books>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const petsDetails = this.productRepository.create(createProductDto);
    await this.productRepository.save(petsDetails);
    return {
      msg : "Data Added successfully",
      status:HttpStatus.OK,
      data:petsDetails
    };
  }

  async findAll() {
    let findAll = await this.productRepository.findAndCount();
    console.log(findAll[1])
    if(!findAll) throw new BadRequestException({ error : "Data Not Found" });
    return {
      status  : HttpStatus.OK,
      messsage : "Data fetch successfully",
      totalData : findAll && findAll.length ? findAll[1] :  0,
      result : findAll && findAll[0]
    }
  }

  async findOne(id: any) {
    const findOne = await this.productRepository.findOne({
      where: {
          id: id,
      },
    })
    if(!findOne) throw new BadRequestException({ error : "Data Not Found" });
    return {
      status  : HttpStatus.OK,
      messsage : "Data fetch successfully",
      // totalData : findAll && findAll.length ? findAll.length :  0,
      result : findOne
    }
  }

 async update(id: any, updateProductDto: UpdateProductDto) {
    const result : any = await this.productRepository.update({id }, updateProductDto);
    return {
      status  : HttpStatus.OK,
      messsage : "Data updated successfully",
      totalData : result && result.length ? result.length :  0,
      result : result
    }
  }

  async remove(id: any) {
    
    const result : any = await this.productRepository.delete(id);
    return {
      status  : HttpStatus.OK,
      messsage : "Data deleted successfully",
      totalData : result && result.length ? result.length :  0,
      result : result
    }
  }


  async softDelete(id: any) {
    const product = await this.productRepository.findOne(id);
  
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
    const searchResults = await this.productRepository.find({
      where: [
        { title: Like(`%${query}%`) },
        { description: Like(`%${query}%`) },
        { author: Like(`%${query}%`) },
      ],
    });

    if (!searchResults || searchResults.length === 0) {
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
