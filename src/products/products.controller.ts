import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Put,
} from '@nestjs/common';

import { ProductsService } from './products.service';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('rating') prodRating: number,
    @Body('author') prodAuthor: string,
  ) {
    const generatedId = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
      prodRating,
      prodAuthor,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('rating') prodRating: number,
    @Body('author') prodAuthor: string,
  ) {
    await this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
      prodRating,
      prodAuthor,
    );
    return null;
  }

  @Put(':id')
  async updateProductPut(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
    @Body('rating') prodRating: number,
    @Body('author') prodAuthor: string,
  ) {
    await this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
      prodRating,
      prodAuthor,
    );
    return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}
