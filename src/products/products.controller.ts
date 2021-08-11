import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { AddProductDto } from './dto/add-Product.dto';
import { ProductsModule } from './products.module';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(public productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body()postData: AddProductDto,): Promise<ProductsModule> {
    return this.productsService.insertProduct(postData);
  }

 /*  @UseGuards(JwtAuthGuard) */
  @Get()
  async getAllProducts() {
    return await this.productsService.getProducts();
  }
  
 /*  @UseGuards(JwtAuthGuard) */
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId)
  }

 /*  @UseGuards(JwtAuthGuard) */
  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body()postData: AddProductDto) {
    await this.productsService.updateProduct(prodId, postData);
  }

  /* @UseGuards(JwtAuthGuard) */
  @Put(':id')
  async updateProductPut(
    @Param('id') prodId: string,
    @Body()postData: AddProductDto ) {
    await this.productsService.updateProduct(prodId, postData);
  }

 /*  @UseGuards(JwtAuthGuard) */
  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId)
  }
}
