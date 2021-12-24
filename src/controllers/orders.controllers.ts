import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { executeSql } from "../db/executeQuery";
import { IResponseData } from "../models/response.model";
import nodemailer from "nodemailer";
import {
  accountSid,
  authToken,
  phoneNumber,
  senderEmail,
} from "../environments/environments";
import twilio from "twilio";

const client = twilio(accountSid, authToken);
const getOrderInfo = async (orderId: number) => {
  const sql = `SELECT ORDER_ID,
    USER_ID,
    PRICE,
    DELIVERY_PRICE,
    TOTAL,
    CREATED_ON,
    EMAIL,
    ADDRESS,
    STATUS
    FROM PUBLIC.BAZAAR_ORDER
    WHERE ORDER_ID = $1 LIMIT 1;`;
  const { rows } = await executeSql(sql, [`${orderId}`]);
  return rows[0];
};

const getOrderDetails = async (orderId: number) => {
  const sql = `SELECT OD_ID,
	ORDER_ID,
  PRODUCT_ID,
	(SELECT PRODUCT_NAME
		FROM BAZAAR_PRODUCTS
		WHERE PRODUCT_ID = OD.PRODUCT_ID) as "name",
	(SELECT PRODUCT_IMAGE
	FROM BAZAAR_PRODUCTS
	WHERE PRODUCT_ID = OD.PRODUCT_ID) as "image",
  (SELECT PRODUCT_DESC
    FROM BAZAAR_PRODUCTS
    WHERE PRODUCT_ID = OD.PRODUCT_ID) as description,
  (SELECT CATEGORY_NAME FROM BAZAAR_CATEGORIES WHERE CATEGORY_ID = (SELECT CATEGORY_ID FROM BAZAAR_PRODUCTS WHERE 
    PRODUCT_ID = OD.PRODUCT_ID)) AS category,
	product_price,quantity,delivery_price
	from bazaar_order_details od
	where order_id = $1;`;
  const { rows } = await executeSql(sql, [`${orderId}`]);
  return rows;
};

const sendEmail = async (receiver: string, status: string) => {
  try {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      name: `${senderEmail}`,
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    const info = await transporter.sendMail({
      from: `"Bazaar Admin" <${senderEmail}>`,
      to: `${receiver}`,
      subject: "Regarding your order at Bazaar",
      text: `Your order has been ${status}`,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error: any) {
    console.log("--error while sending email:\t", error.stack);
  }
};

const sendSms = async (receiver: number, status: string) => {
  try {
    const message = await client.messages.create({
      body: `Your order has been ${status}`,
      from: `${phoneNumber}`,
      to: `${receiver}`,
    });
    console.log("--SMS send:\t", message.sid);
  } catch (error: any) {
    console.log("--error while sending sms:\t", error.stack);
  }
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

/**
 * @route /orders/status
 * @type POST
 * @access PRIVATE
 * @desc update order status
 */
export const updateOrderStatus = async (
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
    const { orderId, status } = req.body;
    const sql = `update bazaar_order
    set status = $1
    where order_id = $2 returning email,phone_num`;
    const { rows } = await executeSql(sql, [status, orderId]);
    await sendEmail(rows[0].email, status);
    if (!!rows[0].phone_num) {
      await sendSms(+rows[0].phone_num, status);
    }
    response = {
      message: "Order status updated",
      status: true,
    };
    res.status(201).json(response).end();
  } catch (error: any) {
    next(error);
  }
};
