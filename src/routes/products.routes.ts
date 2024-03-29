import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { readOne } from "../controllers/products.controllers";
import {
  fetchProducts,
  getCategories,
  insertProduct,
} from "../controllers/products.controllers";

const router = express.Router();

router.get("/get-categories", (req: Request, res: Response) =>
  getCategories(req, res)
);

router.post(
  "/insert-product",
  body("productName").notEmpty().escape(),
  body("categoryId").notEmpty().isNumeric(),
  body("quantity").notEmpty().isNumeric(),
  body("status").notEmpty().isString(),
  body("productImage").notEmpty(),
  body("price").notEmpty().isNumeric(),
  body("deliveryPrice").notEmpty().isNumeric(),
  body("productDesc").notEmpty().escape(),
  body("countryId").notEmpty().isNumeric(),
  (req: Request, res: Response) => insertProduct(req, res)
);

router.post(
  "/fetch-products",
  body("pageIndex").notEmpty().isNumeric(),
  body("pageSize").notEmpty().isNumeric(),
  (req: Request, res: Response) => fetchProducts(req, res)
);

router.post(
  "/readOne",
  body("productId").notEmpty().isNumeric(),
  (req: Request, res: Response, next: NextFunction) => readOne(req, res, next)
);
module.exports = router;
