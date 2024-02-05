import AppError from "../../errors/app-error";
import ProductRepository from "../repositories/product-repository";
import ProductScrapRepository from "../repositories/product-scrap-repository";
import FindAProductByUrl from "./find-a-product-by-url";

describe('FindAProductByURL', () => {
  let productRepository: jest.Mocked<ProductRepository>
  let productScrapRepository: jest.Mocked<ProductScrapRepository>
  let findAProductByUrl: FindAProductByUrl

  beforeAll(() => {
    productRepository = {
      findByUrl: jest.fn(),
      save: jest.fn()
    }
    productScrapRepository = {
      findByUrl: jest.fn()
    }
    findAProductByUrl = new FindAProductByUrl(productRepository, productScrapRepository)
  })

  it('Should use cache instead scraping a new product', async () => {
    productRepository.findByUrl.mockResolvedValue({
      barcode: '',
      brand: '',
      image: '',
      name: '',
      pharmacyId: 0,
      price: 0,
      url: ''
    })
    await findAProductByUrl.execute('https://www.drogasil.com.br/pampers-pants-fralda-ajuste-total-xg-86-unidades.html')
    expect(productScrapRepository.findByUrl).toHaveBeenCalledTimes(0)
    expect(productRepository.save).toHaveBeenCalledTimes(0)
  })


  it('Should use scraping to find a pruduct and try to save', async () => {
    const product = {
      barcode: '',
      brand: '',
      image: '',
      name: '',
      pharmacyId: 0,
      price: 0,
      url: ''
    }
    productRepository.findByUrl.mockResolvedValue(null)
    productScrapRepository.findByUrl.mockResolvedValue(product)
    await findAProductByUrl.execute('https://www.drogasil.com.br/pampers-pants-fralda-ajuste-total-xg-86-unidades.html')
    expect(productRepository.save).toHaveBeenCalledTimes(1)
    expect(productRepository.save).toHaveBeenCalledWith(product)
  })

  it('Should throws product not found exception when neither repository nor cache are returning an invalid product', async () => {
    productRepository.findByUrl.mockResolvedValue(null)
    productScrapRepository.findByUrl.mockResolvedValue(null)
    await expect(findAProductByUrl.execute('https://www.drogasil.com.br/a')).rejects.toThrow('Produto não encontrado')
  })

  it('Should throws invalid URL exception when URL is malformed', async () => {
    await expect(findAProductByUrl.execute('')).rejects.toThrow('URL inválida')
    await expect(findAProductByUrl.execute('leonardo')).rejects.toThrow('URL inválida')
  })
})

