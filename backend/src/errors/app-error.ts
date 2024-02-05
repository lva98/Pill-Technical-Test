import ErrorsType from "./errors-type"

export default class AppError extends Error {
  constructor (
    public readonly id: string,
    public readonly type: ErrorsType,
    public readonly status: number,
    public readonly message: string
  ) {
    super(message)
    Object.setPrototypeOf(this, AppError.prototype)
  }

  public toJson () {
    return {
      id: this.id,
      type: this.type,
      status: this.status,
      message: this.message
    }
  }
}