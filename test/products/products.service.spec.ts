import {ProductsService} from '../../src/products/products.service';
import {Test, TestingModule} from '@nestjs/testing';
import {newProduct, productModelMock} from "./mock/product.mock";
import {ProductRepository} from "../../src/products/repository/product.repository";
import {mockProductRepositoryStub} from "./mock/product-repository.stub";
import {NotFoundException} from "@nestjs/common";

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductRepository,
          useValue: mockProductRepositoryStub
        },
      ],
    }).compile();
    service = module.get<ProductsService>(ProductsService);
    repository = module.get<ProductRepository>(ProductRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfully return all products', async () => {
    const cats = await service.getProducts();
    expect(cats).toEqual([productModelMock]);
  });

  it('should getSingleProduct by id', async () => {
    const foundProducts = await service.getSingleProduct('id');
    expect(foundProducts).toEqual(productModelMock);
  });

  it('should throw NotFound if regex does not match', async () => {
    const newProductWithWrongTile = {...newProduct, title: 'a'};

    await expect(service.insertProduct(newProductWithWrongTile)).rejects.toThrow(NotFoundException);
  });

  it('should return id if regex does match', async () => {
    const newProductWithCorrectTile = {...productModelMock, title: 'a!'};

    const results = await service.insertProduct(newProductWithCorrectTile);

    await expect(results).toEqual(productModelMock.id);
  })

  it('should delete a product successfully', async () => {
    await service.deleteProduct('a bad id');

    const results = jest.spyOn(repository, 'delete');

    expect(results).toBeCalledTimes(1);
  });
});
