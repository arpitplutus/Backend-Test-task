import { Controller, Get, Post, Body, Query, Res, Req } from '@nestjs/common';
import { ProductsService } from './book.service';
import { CreateProductDto } from './dto/create-book.dto';
import { Request, Response } from 'express';

@Controller('books')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createProductDto: CreateProductDto,
  ) {
    // return this.productsService.create(createProductDto);
    const createData = await this.productsService.create(createProductDto);
    if (res) {
      return res.send(createData);
    }
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    const findAll: any = await this.productsService.findAll();
    if (res) {
      return res.send(findAll);
    }
    // return res.send();
  }

  @Get('/getOne')
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Query('id') id: any,
  ) {
    const getOne = await this.productsService.findOne(id);
    if (res) {
      return res.send(getOne);
    }
    // return res.send(getOne);
  }

  @Post('/update')
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Query('id') id: string,
    @Body() updateProductDto: CreateProductDto,
  ) {
    const updateData = await this.productsService.update(id, updateProductDto);
    // return res.send(updateData);
    if (res) {
      return res.send(updateData);
    }
  }

  // @Post('/delete')
  // async remove(@Req() req: Request, @Res() res: Response, @Query('id') id: string) {
  //   let deleteData = await this.productsService.remove(+id);
  //   return res.send(deleteData);
  // }

  @Post('/delete')
  async softDelete(
    @Req() req: Request,
    @Res() res: Response,
    @Query('id') id: any,
  ) {
    const result = await this.productsService.softDelete(id);
    // return res.status(result.status).json(result);
    if (res) {
      return res.send(result);
    }
  }

  @Post('/search') // Assuming you want to change it to a POST request
  async search(@Body() requestBody: { query: string }) {
    const result = await this.productsService.search(requestBody.query);
    return result;
  }
}
