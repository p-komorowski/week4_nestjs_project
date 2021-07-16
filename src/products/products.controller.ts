import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Put,
  NotFoundException,
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
    const regex = /(^[a-z0-9!@#$%^&*()=_{}:;"'<,.>?\d]+$)/g;
    if (title.match(regex)) {
      return { id: generatedId };
    } else {
      throw new NotFoundException('only lowercase letters are allowed!');
    }
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
    const { title, description, price, rating, author } = postData;
    await this.productsService.updateProduct(
      prodId,
      title,
      description,
      price,
      rating,
      author,
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
    const { title, description, price, rating, author } = postData;
    await this.productsService.updateProduct(
      prodId,
      title,
      description,
      price,
      rating,
      author,
    );
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
  }
}
