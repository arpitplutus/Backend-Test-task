import { Controller, Get, Post, Body, Query, Res, Req } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Request, Response } from 'express';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createBookDto: CreateBookDto,
  ) {
    // return this.bookService.create(createBookDto);
    const createData = await this.bookService.create(createBookDto);
    if (res) {
      return res.send(createData);
    }
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    const findAll: any = await this.bookService.findAll();
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
    const getOne = await this.bookService.findOne(id);
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
    @Body() updateBookDto: CreateBookDto,
  ) {
    const updateData = await this.bookService.update(id, updateBookDto);
    // return res.send(updateData);
    if (res) {
      return res.send(updateData);
    }
  }

  // @Post('/delete')
  // async remove(@Req() req: Request, @Res() res: Response, @Query('id') id: string) {
  //   let deleteData = await this.bookService.remove(+id);
  //   return res.send(deleteData);
  // }

  @Post('/delete')
  async softDelete(
    @Req() req: Request,
    @Res() res: Response,
    @Query('id') id: any,
  ) {
    const result = await this.bookService.softDelete(id);
    // return res.status(result.status).json(result);
    if (res) {
      return res.send(result);
    }
  }

  @Post('/search') // Assuming you want to change it to a POST request
  async search(@Body() requestBody: { query: string }) {
    const result = await this.bookService.search(requestBody.query);
    return result;
  }
}
