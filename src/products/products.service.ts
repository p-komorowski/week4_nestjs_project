import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(
    title: string,
    desc: string,
    price: number,
    rating: number,
    author: string,
  ): Promise<string> {
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
      rating,
      author,
    });
    const result = await newProduct.save();
    return result.id;
  }

  async getProducts() : Promise< Product[]>{
    const products = await this.productModel.find().exec();
    return products;
    
  }


  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      rating: product.rating,
      author: product.author,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
    rating: number,
    author: string,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    if (rating) {
      updatedProduct.rating = rating;
    }
    if (author) {
      updatedProduct.author = author;
    }
    updatedProduct.save();
  }
  async deleteProduct(prodId: string) {
    await this.productModel.deleteOne({ _id: prodId }).exec();
  }
  async updateProductPut(
    productId: string,
    title: string,
    desc: string,
    price: number,
    rating: number,
    author: string,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    if (rating) {
      updatedProduct.rating = rating;
    }
    if (author) {
      updatedProduct.author = author;
    }
    updatedProduct.save();
  }

  private async findProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('could not find product');
    }
    return product;
  }
}
