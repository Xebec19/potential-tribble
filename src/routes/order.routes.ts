import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { orderInfo, ordersTable } from "../controllers/orders.controllers";

const router = express.Router();

router.post(
  "/table",
  body("pageSize").notEmpty(),
  body("pageIndex").notEmpty(),
  (req: Request, res: Response, next: NextFunction) =>
    ordersTable(req, res, next)
);

router.post(
  "/info",
  body("orderId").notEmpty().isString(),
  (req: Request, res: Response, next: NextFunction) => orderInfo(req, res, next)
);

module.exports = router;
