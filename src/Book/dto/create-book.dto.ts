import { IsString, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(4)
  title: string;

  @IsString()
  description: string;

  @IsString()
  author: string;
}
