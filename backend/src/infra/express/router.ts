import express, { Router } from "express";
import FindAProductByUrlController from "./controllers/find-a-product-by-url.controller";
import ErrorHandling from "./middlewares/error-handling";

const router: Router = express.Router() 
router.get('/product', FindAProductByUrlController)
router.use(ErrorHandling)

export default router
