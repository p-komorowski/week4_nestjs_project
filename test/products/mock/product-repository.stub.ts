import {productModelMock} from "./product.mock";

export const mockProductRepositoryStub = {
  findAll: jest.fn().mockReturnValue([productModelMock]),
  findOne: jest.fn().mockReturnValue(productModelMock),
  save: jest.fn().mockReturnValue(productModelMock),
  delete: jest.fn()
};
