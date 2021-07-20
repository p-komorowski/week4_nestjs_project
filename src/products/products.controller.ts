import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Put
} from '@nestjs/common';
import { ProductsModule } from './products.module';
import { ProductsService } from './products.service';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body()
    postData: {
      title: string;
      description: string;
      price: number;
      rating: number;
      author: string;
    },
  ): Promise<ProductsModule> {
    const { title, description, price, rating, author } = postData;
    const generatedId = await this.productsService.insertProduct(
      title,
      description,
      price,
      rating,
      author,
    );
  return generatedId
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
    @Body()
    postData: {
      title: string;
      description: string;
      price: number;
      rating: number;
      author: string;
    },
  ) {
    await this.productsService.updateProduct(
      prodId,
     postData
    );
  }
  @Put(':id')
  async updateProductPut(
    @Param('id') prodId: string,
    @Body()
    postData: {
      title: string;
      description: string;
      price: number;
      rating: number;
      author: string;
    },
  ) {
    await this.productsService.updateProduct(
      prodId,
      postData
    );
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
  }
}
