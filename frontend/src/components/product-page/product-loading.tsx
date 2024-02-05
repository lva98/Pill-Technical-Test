const ProductLoading = () => {
  return (
    <>
      <div className="max-w-[400px] flex flex-col gap-2">
        <div className=" rounded-xl flex justify-center">
          <img 
            className="rounded-xl select-none animate-pulse"
            src="https://media.licdn.com/dms/image/C4D0BAQE_-9WC6ViX3Q/company-logo_200_200/0/1677673764885/pillfarma_logo?e=2147483647&v=beta&t=xaqoGhJB3GIBRocRHxVFSwoeP8i708iFefgP6ykUTHA"
          />
        </div>
        <div
          data-testid="cypress-product-loading"
          className="flex justify-center items-center text-center"
        >
          Carregando...
        </div>
      </div>
    </>
  )
}

export default ProductLoading 
