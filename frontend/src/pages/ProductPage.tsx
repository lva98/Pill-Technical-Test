import { useSearchParams } from 'react-router-dom'
import ProductDetails from '../components/product-page/product-details'
import ProductError from '../components/product-page/product-error'
import ProductLoading from '../components/product-page/product-loading'
import { useEffect, useState } from 'react'
import ApiGetProduct, { GetProductDTO } from '../api/get-product'

const ProductPage = () => {
  const [searchParams] = useSearchParams()
  const urlParam = searchParams.get('url') as string

  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<GetProductDTO | undefined>(undefined)

  useEffect(() => {
    ApiGetProduct(urlParam)
      .then(resolve => {
        if (resolve.data) {
          setErrorMessage('')
          return setProduct(resolve.data)
        }
        setErrorMessage(resolve.error!.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <main className="grid grid-flow-row md:grid-flow-col justify-center items-start px-6 gap-2">
      { loading ? (
        <ProductLoading />
      ) : errorMessage || !product ? (
        <ProductError   message={errorMessage ?? 'Produto não encontrado'} />
      ) : (
        <ProductDetails product={product} />
      )}
    </main>
  )
}

export default ProductPage
