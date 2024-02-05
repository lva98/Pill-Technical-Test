interface ApiOutput<T> {
  data?: T,
  error?: {
    message: string
  }
}