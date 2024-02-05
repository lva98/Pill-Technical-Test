import Product from "../../domain/entities/product";
import ProductRepository from "../../domain/repositories/product-repository";
import ProductModel from "../sequelize/product.model";

class ProductSequelizeRepository implements ProductRepository {
  async findByUrl(url: string): Promise<Product | null> {
    const product = await ProductModel.findOne({
      where: { url: url }
    })

    if (!product) {
      return null
    }

    return product
  }

  async save(product: Product): Promise<void> {
    console.log(product)
    await ProductModel.create(product)
  }
}

export default ProductSequelizeRepository
