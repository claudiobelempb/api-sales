import { getCustomRepository } from "typeorm";
import { Product } from "../typeorm/entities/Product";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";

class IndexProductService {
  public async execute(): Promise<Product[]>{
    const productRepository = getCustomRepository(ProductsRepository);
    const products = await productRepository.find();
    return products;
  }
}

export { IndexProductService };