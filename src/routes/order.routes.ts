import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { ordersTable } from "../controllers/orders.controllers";

const router = express.Router();

router.post(
  "/table",
  body("pageSize").notEmpty(),
  body("pageIndex").notEmpty(),
  (req: Request, res: Response, next: NextFunction) =>
    ordersTable(req, res, next)
);

module.exports = router;