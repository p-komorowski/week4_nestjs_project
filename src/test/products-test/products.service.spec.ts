import { ProductsService } from '../../products/products.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Product } from 'src/products/product.model';
import { Model, Query } from 'mongoose';
import { AddProductDto } from 'src/products/dto/add-Product.dto';
import { postData } from 'src/products/dto/postData.dto';
import { createMock } from '@golevelup/nestjs-testing';

const mockProducts = (
  title = 'testTitle',
  description = 'testDesc',
  price = 42,
  author = 'testAuthor',
  rating = 5.5
): AddProductDto => ({
  title,
  description,
  price,
  author,
  rating
});

const mockProductsDoc = (mock?: Partial<AddProductDto>): Partial<postData> => ({
  title: mock?.title || 'testTitle',
  description: mock?.description || 'testDesc',
  price: mock?.price || 42,
  author: mock?.author || 'testAuthor',
  rating: mock?.rating || 5.5,
});

const productsArray = [
  mockProducts(),
  mockProducts('testTitle', 'testDesc', 42, 'testAuthor', 5.5),
  mockProducts('testTitle1', 'testDesc1', 22, 'testAuthor', 9.5),
];

const productsDocArray = [
  mockProductsDoc(),
  mockProductsDoc({
    title: 'testTitle',
    description: 'testDesc',
    price: 42,
    author: 'testAuthor',
    rating: 5.5
  }),
  mockProductsDoc({
    title: 'testTitle1',
    description: 'testDesc1',
    price: 22,
    author: 'testAuthor1',
    rating: 9.5
  }),
];

describe('ProductsService', () => {
  let service: ProductsService;
  let model: Model<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken('Product'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockProducts()),
            constructor: jest.fn().mockResolvedValue(mockProducts()),
            find: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            deleteOne: jest.fn(),
            exec: jest.fn()
          },
        },
      ],
    }).compile();
    service = module.get<ProductsService>(ProductsService);
    model = module.get<Model<Product>>(getModelToken('Product'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all products', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(productsArray),
    } as any);
    const cats = await service.getProducts();
    expect(cats).toEqual(productsArray);
  });

  it('should getSingleProduct by id', async () => {
    jest.spyOn(model, 'findById').mockReturnValueOnce(
      createMock<Query<Product, Product>>({
        exec: jest
          .fn()
          .mockResolvedValueOnce(
            mockProductsDoc({ title: 'testTitle', description: 'testDesc' }),
          ),
      }),
    );
    const findMockProducts = mockProducts('testTitle', 'testDesc');
    const foundProducts = await service.findProduct('id');
    expect(foundProducts).toEqual(findMockProducts);
  });

  it('should insert a new Product', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        _id: 'some id',
        title: 'testtitle!',
        description: 'testdesc!',
        price: 42,
        author: 'testauthor!',
        rating: 5.5
      }),
    );
    const newProduct = await service.insertProduct({
      title: 'testtitle!',
      description: 'testdesc!',
      price: 42,
      author: 'testauthor!',
      rating: 5.5
    });
    expect(newProduct).toEqual(
      mockProducts('testtitle!', 'testdesc!', 42, 'testauthor!', 5.5),
    );
  });

  it.skip('should update a product successfully', async () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<Query<Product, Product>>({
        exec: jest.fn().mockResolvedValueOnce({
          _id: 'testId',
          title: 'testTile',
          description: 'testDesc',
          price: 42,
          author: 'testAuthor',
          rating: 5.5
        }),
      }),
    );
    const updatedCat = await service.insertProduct({
      title: 'testTitle',
      description: 'testDesc',
      price: 42,
      author: 'testAuthor',
      rating: 5.5
    });
    expect(updatedCat).toEqual(
      mockProducts('testTitle', 'testId', 42, 'testAuthor', 5.5),
    );
  });

  it('should delete a product successfully', async () => {
    jest.spyOn(model, 'deleteOne').mockResolvedValueOnce(true as any);
    expect(service.deleteProduct('a bad id')).toEqual({ deleted: true });
  });
});
