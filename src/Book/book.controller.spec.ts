/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Repository } from 'typeorm/repository/Repository';
import { getRepositoryToken } from '@nestjs/typeorm/dist/common/typeorm.utils';
import { book } from './entities/book.entity';


describe('BookController', () => {
    let controller: BookController;
    let service: BookService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [BookController],
            providers: [
                BookService,
                {
                    provide: getRepositoryToken(book),
                    useClass: Repository,
                },
            ],
        }).compile();

        controller = module.get<BookController>(BookController);
        service = module.get<BookService>(BookService);
    });

    describe('create', () => {
        it('should create a Books', async () => {
            const createBookDto: CreateBookDto = {
                title: 'Test Book',
                description: 'A test book',
                author: 'Test Author',
            };

            const expectedResult: any = {
                msg: 'Data Added successfully',
                status: 200,
                data: createBookDto,
            };
            jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
            const result = await controller.create(null, null, createBookDto);
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
            const updateBookDto: CreateBookDto = {
                title: 'Updated Book Title',
                description: 'Updated book description',
                author: 'Updated Author',
            };
            const expectedResult: any = {
                status: 200,
                message: 'Data updated successfully',
                totalData: 1,
                result: { updateBookDto },
            };
            jest.spyOn(service, 'update').mockResolvedValue(expectedResult);
            const result = await controller.update(null, null, Bookid, updateBookDto);
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
