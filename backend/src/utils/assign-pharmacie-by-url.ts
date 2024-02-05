import AppError from "../errors/app-error"
import ErrorsType from "../errors/errors-type"
import Pharmacies from "./pharmacies"

const AssignPharmacyByUrl = (url: string): Pharmacies => {
  if (url.includes('drogasil.com.br')) {
    return Pharmacies.DROGASIL
  }

  if (url.includes('drogaraia.com.br')) {
    return Pharmacies.DROGARAIA
  }

  if (url.includes('panvel.com')) {
    return Pharmacies.PANVEL
  }

  throw new AppError(
    'PHARMACY_URL_NOT_IMPLEMENTED',
    ErrorsType.UTILS,
    501,
    `Pharmacy with '${url}' not implemented`
  )
}

export default AssignPharmacyByUrl
