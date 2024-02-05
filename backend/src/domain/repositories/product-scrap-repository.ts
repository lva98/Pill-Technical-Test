import ProductRepository from "./product-repository";

interface ProductScrapRepository extends Omit<ProductRepository, 'save'> {}

export default ProductScrapRepository
