import { useEffect, useState } from "react"
import { GetProductDTO } from "../../api/get-product"

const ProductDetails = (props: { product: GetProductDTO }) => {
  const [localPrice, setLocalPrice] = useState('R$ 0,00')
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  useEffect(() => {
    const price = formatter.format(props.product.price)
    setLocalPrice(price)
  }, [props.product])

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="max-w-[400px] max-h-[400px] border-violet-300 border-2 rounded-xl hover:p-1 duration-500 bg-white">
          <img 
            className="rounded-xl w-full h-full select-none"
            src={props.product.image}
          />
        </div>
      </div>
        
      <div className="flex justify-start flex-col items-end max-w-[400px] flex-grow bg-white rounded-xl shadow-md p-3 gap-3">
        <div
          data-testid="cypress-product-details-name"
          className="text-2xl border-b-2 pb-2 border-slate-200 w-full line-clamp-2"
        >
          { props.product.name }
        </div>
        <div className="flex flex-col justify-center gap-4 text-center md:text-end w-full">
          <div>
            <div className="text-sm uppercase font-semibold text-blue-700">
                código de barras
            </div>
            <div
              data-testid="cypress-product-details-barcode"
              className="text-xl capitalize"
            >
              { props.product.barcode }
            </div>
          </div>
          <div>
            <div className="text-sm uppercase font-semibold text-blue-700">
                marca
            </div>
            <div
              data-testid="cypress-product-details-brand"
              className="text-xl capitalize"
            >
              { props.product.brand }
            </div>
          </div>
          <div> 
            <div
              className="text-sm uppercase font-semibold text-blue-700"
            >
                preço
            </div>
            <div 
              data-testid="cypress-product-details-price"
              className="text-xl capitalize"
            >
                { localPrice }
            </div>                
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetails
