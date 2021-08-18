import {Product} from "../../../src/products/product.model";
import {AddProductDto} from "../../../src/products/dto/add-product.dto";

export const productModelMock: Product = {
  _id: 'testId',
  title: 'testTile',
  description: 'testDesc',
  price: 42,
  author: 'testAuthor',
  rating: 5.5
} as Product;

export const addProductDtoMock: AddProductDto = {
  title: 'testTitle',
  description: 'testDesc',
  price: 42,
  author: 'testAuthor',
  rating: 5.5
} as AddProductDto;

export const newProduct = {
  _id: 'some id',
  id: 'some id',
  title: 'testtitle!',
  description: 'testdesc!',
  price: 42,
  author: 'testauthor!',
  rating: 5.5
};
