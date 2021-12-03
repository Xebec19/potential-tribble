import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { executeSql } from "../db/executeQuery";
import { IResponseData } from "../models/response.model";

/**
 * @route /orders/table
 * @type POST
 * @access PRIVATE
 * @desc sends orders in pagination
 */
export const ordersTable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let response: IResponseData;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Invalid parameters");
    }
    const { pageSize, pageIndex } = req.body;
    const sql = `SELECT ORDER_ID,USER_ID,PRICE,	DELIVERY_PRICE,	TOTAL,	CREATED_ON,	EMAIL,	ADDRESS FROM PUBLIC.BAZAAR_ORDER LIMIT ${pageSize} OFFSET ${
      pageSize * pageIndex
    };`;
    const { rows } = await executeSql(sql);
    response = {
      message: "Orders fetched successfully",
      status: true,
      data: rows,
    };
    res.status(201).json(response).end();
    return;
  } catch (error: any) {
    next(error);
  }
};
