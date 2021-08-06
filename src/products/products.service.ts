import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';
import { postData } from './postData';
import { AddProductDto } from './add-Product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(newProduct: AddProductDto): Promise<string> {
    const regex = /^[a-z]+[!@#$%^&*()=_{}:;"'<,.>?€]$/g;
    if (newProduct.title.match(regex)) {
      const addedProduct = new this.productModel({
        ...newProduct
      });
      const result = await addedProduct.save();
      return result.id
    } else {
      throw new NotFoundException(
        'Input can conatin only lowercase signs and one special character',
      );
    }
  }

  async getProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async getSingleProduct(productId: string): Promise<Product> {
    return this.findProduct(productId)
  }
  async updateProduct(productId: string, postUpdateProduct: postData) {
    const updatedProduct = await this.findProduct(productId);
    await updatedProduct.update({
      ...postUpdateProduct
    });
  }

  async updateProductPut(productId: string, postUpdateProduct: postData) {
    const updatedProduct = await this.findProduct(productId);
    await updatedProduct.update({
      ...postUpdateProduct
    });
  }

  async deleteProduct(prodId: string) {
    await this.productModel.deleteOne({ _id: prodId }).exec();
  }

  async findProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('could not find product');
    }
    return product
  }
}
