import AxiosApi from "./axios"

export interface GetProductDTO {
  name: string,
  barcode: string,
  pharmacyId: number
  brand: string,
  image: string,
  price: number,
  url: string
}

const ApiGetProduct = async (url: string): Promise<ApiOutput<GetProductDTO>> => {
  try {
    const response = await AxiosApi.get<GetProductDTO>(`/product?url=${url}`)
    const product = response.data
    return {
      data: product
    }
  } catch (err: any) {
    if (err.response?.data?.message) {
      return {
        error: { message: err.response.data.message }
      }
    }
    return {
      error: { message: 'Ops... Algo deu errado!' }
    }
  }
}

export default ApiGetProduct
