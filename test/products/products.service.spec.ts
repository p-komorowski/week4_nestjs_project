import { ProductsService } from '../../src/products/products.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
describe('Products.Controller', () => {
  let service: ProductsService;

  const mockUsersModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken('Product'),
          useValue: mockUsersModel,
        },
      ],
    }).compile();
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be definde', () => {
    expect(service).toBeDefined();
  });

  it('should insert new product', () => {
    expect(
      service.insertProduct('testTitle', 'testDesc', 29.0, 6.0, 'testAuthor'),
    );
  });

  it('should get all products', () => {
    expect(service.getProducts());
  });

  it('should get single product', () => {
    expect(service.getSingleProduct('testId'));
  });

  it('should update product', () => {
    expect(
      service.updateProduct(
        'testId',
        'testTitle',
        'testDesc',
        29.99,
        4.0,
        'testAuthor',
      ),
    );
  });

  it('should delete product', () => {
    expect(service.deleteProduct('testId'));
  });
});
