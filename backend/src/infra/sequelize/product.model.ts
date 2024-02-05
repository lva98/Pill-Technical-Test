import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';
import { Attribute, Table, NotNull, PrimaryKey, AutoIncrement } from '@sequelize/core/decorators-legacy';

@Table({ tableName: 'Product' })
class ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>

  @Attribute(DataTypes.STRING(255))
  @NotNull
  declare name: string

  @Attribute(DataTypes.SMALLINT)
  @NotNull
  declare pharmacyId: number

  @Attribute(DataTypes.STRING)
  @NotNull
  declare barcode: string

  @Attribute(DataTypes.STRING)
  @NotNull
  declare brand: string

  @Attribute(DataTypes.STRING(2083))
  @NotNull
  declare image: string

  @Attribute(DataTypes.DOUBLE)
  @NotNull
  declare price: number

  @Attribute(DataTypes.STRING(2083))
  @NotNull
  declare url: string
}

export default ProductModel
