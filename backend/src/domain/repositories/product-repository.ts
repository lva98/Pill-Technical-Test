import Product from "../entities/product";

interface ProductRepository {
  findByUrl (url: string): Promise<Product | null>
  save (product: Product): Promise<void>
}

export default ProductRepository