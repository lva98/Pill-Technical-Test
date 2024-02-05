import axios, { CustomParamsSerializer, ParamEncoder } from "axios";
import { parse, stringify } from 'qs'

// FIX: Axios params not working, tried to use 'parse' and 'stringify' from 'qs' library
const AxiosApi = axios.create({
  baseURL: 'http://localhost:3000/api',
})

export default AxiosApi
