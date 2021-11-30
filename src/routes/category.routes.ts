import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { categoryTable } from "../controllers/category.controllers";
const router = express.Router();
router.post(
  "/category-table",
  (req: Request, res: Response, next: NextFunction) =>
    categoryTable(req, res, next)
);

router.post(
  "/insert",
  body("categoryName").notEmpty().escape(),
  body("category")
); // todo make routes for insert and update
module.exports = router;
