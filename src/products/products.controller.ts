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
import { AddProductDto } from './add-Product.dto';
import { ProductsModule } from './products.module';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  
  @Post()
  async addProduct(
    @Body()
    postData: AddProductDto
    
  ): Promise<ProductsModule> {
    const generatedId = await this.productsService.insertProduct(
      postData
    );
    return generatedId;
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
    postData,
  ) {
    await this.productsService.updateProduct(prodId, postData);
  }

  @Put(':id')
  async updateProductPut(
    @Param('id') prodId: string,
    @Body()
    postData,
  ) {
    await this.productsService.updateProduct(prodId, postData);
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
  }
}
