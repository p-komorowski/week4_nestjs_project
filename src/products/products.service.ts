import {Injectable, NotFoundException} from '@nestjs/common';
import {Product} from './product.model';
import {postData} from './dto/post-data.dto';
import {AddProductDto} from './dto/add-product.dto';
import {ProductRepository} from "./repository/product.repository";

@Injectable()
export class ProductsService {
  constructor(private readonly repository: ProductRepository) {}

  async insertProduct(newProduct: AddProductDto): Promise<string> {
    const regex = /^[a-z]+[!@#$%^&*()=_{}:;"'<,.>?€]$/g;
    if (newProduct.title.match(regex)) {
      const result = await this.repository.save({...newProduct});
      return result.id
    } else {
      throw new NotFoundException(
        'Input can contain only lowercase signs and one special character',
      );
    }
  }

  public async getProducts(): Promise<Product[]> {
    return this.repository.findAll();
  }

  async getSingleProduct(productId: string): Promise<Product> {
    return (await this.repository.findOne(productId))
  }
  async updateProduct(productId: string, postUpdateProduct: postData): Promise<void> {
    const updatedProduct = await this.repository.findOne(productId);
    await updatedProduct.update({
      ...postUpdateProduct
    });
  }

<<<<<<< HEAD
  async updateProductPut(productId: string, postUpdateProduct: postData) {
    const updatedProduct = await this.findProduct(productId);
    await updatedProduct.update({
      ...postUpdateProduct
    });
  }

  async deleteProduct(prodId: string): Promise <void> {
    await this.productModel.deleteOne({ _id: prodId }).exec();
  }

  async findProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('could not find product');
    }
    return product
=======
  async deleteProduct(prodId: string): Promise<void> {
    await this.repository.delete(prodId);
>>>>>>> test/unit-tests
  }
}
