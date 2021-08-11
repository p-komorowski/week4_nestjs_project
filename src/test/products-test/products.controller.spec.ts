/* 
import { Test, TestingModule } from '@nestjs/testing';
import { AddProductDto } from 'src/products/dto/add-Product.dto';
import { postData } from 'src/products/dto/postData.dto';
import { ProductsController } from '../../products/products.controller';
import { ProductsService } from '../../products/products.service';

const testTitle = 'TestTitle';
const testDesc = 'TestDesc';

describe('Cat Controller', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([
              {title: testTitle, desc: testDesc, price: 45, rating:4.5, author:'testAuthor'},
              {title: 'testTitle2', desc: 'testDesc2', price: 35, rating:3.5, author:'testAuthor2'},
              { title: 'testTitle3', desc: 'testDesc3', price: 25, rating:2.5, author:'testAuthor3'},
            ]),
            getOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                title: testTitle,
                desc: testDesc,
                price: 4,
                rating: 4.5,
                author:'testAuthor',
                _id: id,
              }),
            ),
            getOneByName: jest
              .fn()
              .mockImplementation((name: string) =>
                Promise.resolve({ name, desc: testDesc, price: 45, rating: 4.5, author:'testAuthor' }),
              ),
            insertOne: jest
              .fn()
              .mockImplementation((data: postData) =>
                Promise.resolve({ _id: 'some id', ...data }),
              ),
            updateOne: jest
              .fn()
              .mockImplementation((data: postData) =>
                Promise.resolve({ _id: 'some id', ...data }),
              ),
            deleteOne: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should get all products', () => {
      expect(controller.getAllProducts()).resolves.toEqual([
        {
          title: testTitle,
          desc: testDesc,
          price: 45,
          rating: 4.5,
          author: 'testAuthor'
        },
        {
          title: 'testTitle2',
          desc: 'testDesc2',
          price: 35,
          rating: 3.5,
          author: 'testAuthor2'
        },
        {
          title: 'testTitle3',
          desc: 'testDesc3',
          price: 25,
          rating: 2.5,
          author: 'testAuthor3'
        },
      ]);
    });
  });
  describe('getProduct', () => {
    it('should get a single products', () => {
      expect(controller.getProduct('a strange id')).resolves.toEqual({
        title: testTitle,
          desc: testDesc,
          price: 45,
          rating: 4.5,
          author: 'testAuthor',
        _id: 'a strange id'
      });
      expect(controller.getProduct('a different id')).resolves.toEqual({
        title: testTitle,
        desc: testDesc,
        price: 45,
        rating: 4.5,
        author: 'testAuthor',
        _id: 'a different id',
      });
    });
  })

  describe('addProduct', () => {
    it('should create a new product', () => {
      const newCatDTO: AddProductDto = {
        title: 'testtitle!',
        author:'testauthor!',
        price: 5.5,
        description:'testdesc',
        rating: 4.4
      };
      expect(controller.addProduct(newCatDTO)).resolves.toEqual({
        _id: 'some id',
        ...newCatDTO,
      });
    });
  });

  describe('removeProduct', () => {
    it('should delete a product', () => {
      expect(controller.removeProduct('id that exists')).resolves.toEqual({
        deleted: true,
      });
    });
});
}) */