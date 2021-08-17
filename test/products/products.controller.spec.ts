import {Test, TestingModule} from '@nestjs/testing';
import {ProductsController} from '../../src/products/products.controller';
import {ProductsService} from '../../src/products/products.service';
import {productModelMock} from "./mock/product.mock";

describe('Products Controller', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([productModelMock]),
            getOne: jest.fn().mockResolvedValue(productModelMock),
            getSingleProduct: jest.fn().mockResolvedValue(productModelMock),
            insertOne: jest.fn(),
            updateOne: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should get all products', () => {
      expect(controller.getAllProducts()).resolves.toEqual([productModelMock]);
    });
  });

  describe('removeProduct', () => {
    it('should delete product', () => {
      expect(controller.removeProduct('id that exists')).resolves.toEqual({
        deleted: true
      });
    });
  });
});
