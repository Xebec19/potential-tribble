import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import {
  orderInfo,
  ordersTable,
  updateOrderStatus,
} from "../controllers/orders.controllers";

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

router.post(
  "/update-status",
  body("orderId").notEmpty().isString(),
  body("status").notEmpty().isString(),
  (req: Request, res: Response, next: NextFunction) =>
    updateOrderStatus(req, res, next)
);
module.exports = router;