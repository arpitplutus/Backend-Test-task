import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-book.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
