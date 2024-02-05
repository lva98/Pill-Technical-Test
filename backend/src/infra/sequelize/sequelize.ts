import { Sequelize } from "@sequelize/core" 
import ProductModel from "./product.model"

export const sequelize = new Sequelize('mysql://admin:admin@db:3306/pill_technical_test', {
  models: [ProductModel]
})
