import { IsString, IsNotEmpty, MinLength } from "class-validator";
import { Column } from "typeorm";

export class CreateProductDto {


    @IsString()
    @MinLength(4)
    title: string;

    @IsString()
    description: string;

    @IsString()
    author: string;

    @Column({ default: false }) // Default to false, indicating the product is not deleted
    isDeleted: boolean;
}
