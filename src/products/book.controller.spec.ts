/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './book.controller';
import { ProductsService } from './book.service';
import { CreateProductDto } from './dto/create-book.dto';
import { Repository } from 'typeorm/repository/Repository';
import { getRepositoryToken } from '@nestjs/typeorm/dist/common/typeorm.utils';
import { products } from './entities/book.entity';


describe('ProductsController', () => {
    let controller: ProductsController;
    let service: ProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ProductsController],
            providers: [
                ProductsService,
                {
                    provide: getRepositoryToken(products),
                    useClass: Repository,
                },
            ],
        }).compile();

        controller = module.get<ProductsController>(ProductsController);
        service = module.get<ProductsService>(ProductsService);
    });

    describe('create', () => {
        it('should create a Books', async () => {
            const createProductDto: CreateProductDto = {
                title: 'Test Book',
                description: 'A test book',
                author: 'Test Author',
            };

            const expectedResult: any = {
                msg: 'Data Added successfully',
                status: 200,
                data: createProductDto,
            };
            jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
            const result = await controller.create(null, null, createProductDto);
            return result
        });
    });

    describe('findAll', () => {
        it('should get all Books', async () => {
            const expectedResult: any = {
                status: 200,
                messsage: 'Data fetch successfully',
                totalData: 2,
            };
            jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);
            const result = await controller.findAll(null, null);
            return result
        });
    });

    describe('findOne', () => {
        it('should get one Books by ID', async () => {
            const Bookid = '123';
            const expectedResult: any = {
                status: 200,
                messsage: 'Data fetch successfully',
            };
            jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);
            const result = await controller.findOne(null, null, Bookid);
            return result
        });
    });
    describe('update', () => {
        it('should update a Book by ID', async () => {
            const Bookid = '123';
            const updateProductDto: CreateProductDto = {
                title: 'Updated Book Title',
                description: 'Updated book description',
                author: 'Updated Author',
            };
            const expectedResult: any = {
                status: 200,
                message: 'Data updated successfully',
                totalData: 1,
                result: { updateProductDto },
            };
            jest.spyOn(service, 'update').mockResolvedValue(expectedResult);
            const result = await controller.update(null, null, Bookid, updateProductDto);
            return result
        });
    });

    describe('softDelete', () => {
        it('should soft delete a book by ID', async () => {
            const Bookid = '123';
            const expectedResult: any = {
                status: 200,
                message: 'Soft delete successful',
            };
            jest.spyOn(service, 'softDelete').mockResolvedValue(expectedResult);
            const result = await controller.softDelete(null, null, Bookid);
            return result

        });
    });

    describe('search', () => {
        it('should search for Book based on a query', async () => {
            // Arrange
            const searchQuery = 'dd';
            const expectedResult: any = {
                status: 200,
                message: 'Search results fetched successfully',
                totalResults: 2, 
                results: [{}],
            };

            // Mock the service method
            jest.spyOn(service, 'search').mockResolvedValue(expectedResult);

            // Act
            const result = await controller.search({ query: searchQuery });
            return result

        });
    });

});
