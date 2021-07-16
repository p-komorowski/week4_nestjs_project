import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('Products.Controller', () => {
  let controller: ProductsController;

  const mockUsersService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    })
      .overrideProvider(ProductsService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<ProductsController>(ProductsController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add product', () => {
    expect(
      controller.addProduct({
        title: ' testtitle',
        description: 'testdesc',
        price: 2.99,
        rating: 5.0,
        author: 'testauthor',
      })
    );
  });

  it('should get all products', () => {
    expect(controller.getAllProducts());
  });

  it('should update product', () => {
    expect(
      controller.updateProduct('testId', {
        title: 'testTitle',
        description: 'testDesc',
        price: 29.99,
        rating: 4.0,
        author: 'testAuthor',
      }),
    );
  });
  
  it('should remove product', () => {
    expect(controller.removeProduct('testId'))
  });
});
