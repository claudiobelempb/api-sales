import { AppError } from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { Product } from "../typeorm/entities/Product";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRequest): Promise<Product>{
    const productRepository = getCustomRepository(ProductsRepository);

    const product = await productRepository.findOne(id);

    if(!product){
      throw new AppError('Product not found!');
    }

    const productExistName = await productRepository.findByName(name);

    if(productExistName){
      throw new AppError('There is already one product with this name.');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);

    return product;
  }
}

export { UpdateProductService };