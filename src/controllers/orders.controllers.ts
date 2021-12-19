import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { executeSql } from "../db/executeQuery";
import { IResponseData } from "../models/response.model";

const getOrderInfo = async (orderId: number) => {
  const sql = `SELECT ORDER_ID,
    USER_ID,
    PRICE,
    DELIVERY_PRICE,
    TOTAL,
    CREATED_ON,
    EMAIL,
    ADDRESS
    FROM PUBLIC.BAZAAR_ORDER
    WHERE ORDER_ID = $1 LIMIT 1;`;
  const { rows } = await executeSql(sql, [`${orderId}`]);
  return rows[0];
};

const getOrderDetails = async (orderId: number) => {
  const sql = `SELECT OD_ID,
	ORDER_ID,
	(SELECT PRODUCT_NAME
		FROM BAZAAR_PRODUCTS
		WHERE PRODUCT_ID = OD.PRODUCT_ID),
	(SELECT PRODUCT_IMAGE
	FROM BAZAAR_PRODUCTS
	WHERE PRODUCT_ID = OD.PRODUCT_ID)
	product_price,quantity,delivery_price
	from bazaar_order_details od
	where order_id = $1;`;
  const { rows } = await executeSql(sql, [`${orderId}`]);
  return rows;
};

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
    const sql = `SELECT ORDER_ID,USER_ID,PRICE,	DELIVERY_PRICE,	TOTAL,	CREATED_ON,	EMAIL,	ADDRESS, COUNT(*) OVER() AS "totalOrders" FROM PUBLIC.BAZAAR_ORDER LIMIT ${pageSize} OFFSET ${
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

/**
 * @route /orders/info
 * @type POST
 * @access PRIVATE
 * @desc sends order details
 */
export const orderInfo = async (
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
    const { orderId } = req.body;
    const orderDetails = await getOrderInfo(orderId);
    const orderItems = await getOrderDetails(orderId);
    response = {
      message: "Order details fetched successfully",
      status: true,
      data: { orderDetails, orderItems },
    };
    res.status(201).json(response).end();
  } catch (error) {
    next(error);
  }
};
