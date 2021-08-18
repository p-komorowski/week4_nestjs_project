import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Product} from "../product.model";
import {Injectable, NotFoundException} from "@nestjs/common";
import {AddProductDto} from "../dto/add-product.dto";

@Injectable()
export class ProductRepository {
  constructor(@InjectModel('Product') private readonly model: Model<Product>) {}

  async findOne(id: string): Promise<Product> {
    const product = await this.model.findById(id).exec();
    if (!product) {
      throw new NotFoundException('could not find product');
    }
    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.model.find().exec();
  }

  async save(doc: AddProductDto): Promise<Product> {
    const product = new this.model(doc);
    return product.save();
  }

  async delete(id: string): Promise<any> {
    return this.model.deleteOne({_id: id}).exec();
  }
}
