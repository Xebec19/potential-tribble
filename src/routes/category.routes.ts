import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import {
  categoryTable,
  insertCategory,
  readOne,
  updateCategory,
} from "../controllers/category.controllers";
const router = express.Router();
router.post(
  "/category-table",
  (req: Request, res: Response, next: NextFunction) =>
    categoryTable(req, res, next)
);

router.post(
  "/insert",
  body("categoryName").notEmpty().escape(),
  body("status").notEmpty().escape(),
  body("parentId").optional({ nullable: true }).isNumeric(),
  (req: Request, res: Response, next: NextFunction) =>
    insertCategory(req, res, next)
);

router.post(
  "/update",
  body("categoryId").notEmpty().isNumeric(),
  body("categoryName").notEmpty().escape(),
  body("status").notEmpty().escape(),
  body("parentId").optional({ nullable: true }).isNumeric(),
  (req: Request, res: Response, next: NextFunction) =>
    updateCategory(req, res, next)
);

router.post(
  "/readOne",
  body("categoryId").notEmpty().isNumeric(),
  (req: Request, res: Response, next: NextFunction) => readOne(req, res, next)
);

module.exports = router;
