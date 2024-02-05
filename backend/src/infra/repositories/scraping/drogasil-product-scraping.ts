import puppeteer from "puppeteer"
import Product from "../../../domain/entities/product"
import Pharmacies from "../../../utils/pharmacies"
import AppError from "../../../errors/app-error"
import ErrorsType from "../../../errors/errors-type"

const DrogasilProductScraping = async (url: string): Promise<Product> => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox']
  })
  const page = await browser.newPage()

  try {
    await page.evaluate(() => {
      const script = document.createElement('script');
      script.src = 'https://code.jquery.com/jquery-3.6.4.min.js';
      document.head.appendChild(script);
      return new Promise((resolve) => {
        script.onload = resolve;
      });
    });

    await page.setViewport({ width: 1366, height: 768 })
    await page.goto(url, { waitUntil: 'domcontentloaded' })

    await page.waitForFunction(() => {
      const priceElement = document.querySelector('.Pricestyles__ProductPriceStyles-sc-118x8ec-0.price');
      return priceElement && priceElement?.textContent?.trim() !== 'R$0,00';
    });

    const name = await page.$eval(
      '.Titlestyles__TitleStyles-sc-6rxg4t-0',
      el => el?.textContent?.trim()
    )

    const brand = await page.$eval(
      'li.brand',
      el => el?.textContent?.trim()
    )

    const image = await page.$eval(
      '[alt="Imagem do Produto"]',
      el => el.getAttribute('src')
    )

    const price = await page.$eval(
      '.Pricestyles__ProductPriceStyles-sc-118x8ec-0.price',
      el => {
        const priceStr = el?.textContent?.trim()
        if (priceStr) {
          return parseFloat(priceStr.replace(/[^\d,.-]/g, '').replace(',', '.'));
        }
        return 0
      }
    )

    const barcode = await page.evaluate(() => {
      return $('th:contains("EAN") + td div.ConverterHtmlstyles__ConverterHtmlStyles-sc-186sryh-0.gjcTgl')?.text().trim()
    });

    if (!name || !brand || !image || !price || !barcode) {
      throw new Error
    }

    return {
      name,
      brand,
      image,
      price,
      barcode,
      url,
      pharmacyId: Pharmacies.DROGASIL
    }
  } catch {
    throw new AppError(
      'SCRAPING_ERROR',
      ErrorsType.INFRA,
      404,
      'Produto não encontrado'
    )
  } finally {
    await browser.close()
  }
}

export default DrogasilProductScraping
