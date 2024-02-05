import Product from "../entities/product";
import ProductRepository from "../repositories/product-repository";
import AppError from "../../errors/app-error";
import AssignPharmacyByUrl from "../../utils/assign-pharmacie-by-url";
import CheckValidUrl from "../../utils/check-valid-url";
import Pharmacies from "../../utils/pharmacies";
import ErrorsType from "../../errors/errors-type";
import ProductScrapRepository from "../repositories/product-scrap-repository";

export default class FindAProductByUrl {
  constructor (
    private productRepository: ProductRepository, 
    private productScrapRepository: ProductScrapRepository
  ) { }

  public validate (url: string) {
    if (!CheckValidUrl(url)) {
      throw new AppError(
        'VALIDATION_ERROR',
        ErrorsType.USECASES,
        400,
        'URL inválida'
      )
    }
  }

  public async execute (url: string): Promise<Product> {
    this.validate(url)
    const pharmacyId = AssignPharmacyByUrl(url)

    if (pharmacyId !== Pharmacies.DROGASIL) {
      throw new AppError(
        'NOT_IMPLEMENTED',
        ErrorsType.USECASES,
        501,
        `Farmácia de código '${pharmacyId}' não implementada`
      )
    }

    let product = await this.productRepository.findByUrl(url)
    if (!product) {
      product = await this.productScrapRepository.findByUrl(url)
      if (!product) {
        throw new AppError(
          'PRODUCT_NOT_FOUND',
          ErrorsType.USECASES,
          404,
          'Produto não encontrado'
        )
      }
      await this.productRepository.save(product)
    }

    return product
  }
}