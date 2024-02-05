import Product from "../../domain/entities/product";
import ProductRepository from "../../domain/repositories/product-repository";
import ProductScrapRepository from "../../domain/repositories/product-scrap-repository";
import AppError from "../../errors/app-error";
import ErrorsType from "../../errors/errors-type";
import AssignPharmacyByUrl from "../../utils/assign-pharmacie-by-url";
import Pharmacies from "../../utils/pharmacies";
import DrogasilProductScraping from "./scraping/drogasil-product-scraping";

class ProductScrapingRepository implements ProductScrapRepository {
  async findByUrl (url: string): Promise<Product> {
    const pharmacyId = AssignPharmacyByUrl(url)
    if (pharmacyId === Pharmacies.DROGASIL) {
      return await DrogasilProductScraping(url)
    }

    throw new AppError(
      'PHARMACY_SCRAPING_NOT_IMPLEMENTED',
      ErrorsType.INFRA,
      501,
      `Scraping para farmácia com id '${pharmacyId}' ainda não foi implementado`
    )
  }
}

export default ProductScrapingRepository