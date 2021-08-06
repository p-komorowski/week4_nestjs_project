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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddProductDto } from './add-Product.dto';
import { ProductsModule } from './products.module';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body()
    postData: AddProductDto,
  ): Promise<ProductsModule> {
    const generatedId = await this.productsService.insertProduct(postData);
    return generatedId
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products
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
    @Body()
    postData
  ) {
    await this.productsService.updateProduct(prodId, postData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProductPut(
    @Param('id') prodId: string,
    @Body()
    postData
  ) {
    await this.productsService.updateProduct(prodId, postData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId)
  }
}
