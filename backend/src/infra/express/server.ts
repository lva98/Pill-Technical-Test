import express from 'express'
import 'express-async-errors'
import router from './router'
import NotFound from './middlewares/not-found'
import cors from 'cors'

export const runExpress = () => {
  const app = express()
  app.use(cors())
  const port = 3000

  app.use(express.urlencoded({ extended: true }))
  app.use('/api', router)
  app.use(NotFound)

  app.listen(port, () => {
    console.log('server running')
  })
}
