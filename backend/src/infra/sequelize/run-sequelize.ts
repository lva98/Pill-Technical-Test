import ProductModel from "./product.model"
import { sequelize } from "./sequelize"

export const runSequelize = async () => {
  await sequelize.authenticate()
  await ProductModel.sync()
}
