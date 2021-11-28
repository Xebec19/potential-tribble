import express, { Request, Response } from "express";
import { categoryTable } from "../controllers/category.controllers";
const router = express.Router();
router.get("/category-table", (req: Request, res: Response) =>
  categoryTable(req, res)
);
module.exports = router;
