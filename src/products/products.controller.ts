import {Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards,} from '@nestjs/common';
import {AddProductDto} from './dto/add-product.dto';
import {ProductsService} from './products.service';
import {Product} from "./product.model";
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(public productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body()postData: AddProductDto): Promise<string> {
    return this.productsService.insertProduct(postData);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.getProducts();
  }
  
 @UseGuards(JwtAuthGuard)
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId)
  }

 @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body()postData: AddProductDto) {
    await this.productsService.updateProduct(prodId, postData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProductPut(
    @Param('id') prodId: string,
    @Body()postData: AddProductDto ) {
    await this.productsService.updateProduct(prodId, postData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId)
  }
}
