import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { executeSql } from "../db/executeQuery";
import { IResponseData } from "../models/response.model";

/**
 * @type GET
 * @route /products/get-categories
 * @access PRIVATE
 */
export const getCategories = async (req: Request, res: Response) => {
  let response: IResponseData;
  try {
    const { rows } = await executeSql(
      "SELECT CATEGORY_ID,CATEGORY_NAME FROM BAZAAR_CATEGORIES WHERE STATUS = 'ACTIVE'"
    );
    response = {
      message: "Fetched categories",
      status: true,
      data: rows,
    };
    res.status(201).json(response).end();
    return;
  } catch (error: any) {
    console.log(error.message);
    response = {
      message: error.message,
      status: false,
      data: false,
    };
    res.status(401).json(response).end();
  }
};

/**
 * @route /products/insert-product
 * @parameters productName,categoryId,productImage,quantity,status,price,deliveryPrice,product Description,countryId
 * @desc insert new product in database
 * @type PRIVATE
 */
export const insertProduct = async (req: Request, res: Response) => {
  let response: IResponseData;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Invalid parameters");
    }
    const {
      productName,
      categoryId,
      quantity,
      status,
      productImage,
      price,
      deliveryPrice,
      productDesc,
      countryId,
    } = req.body;
    await executeSql(
      `
      INSERT INTO PUBLIC.BAZAAR_PRODUCTS(
        CATEGORY_ID,
        PRODUCT_NAME,
        PRODUCT_IMAGE,
        QUANTITY,
        STATUS,
        PRICE,
        DELIVERY_PRICE,
        PRODUCT_DESC
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`,
      [
        categoryId,
        productName,
        productImage,
        quantity,
        status,
        price,
        deliveryPrice,
        productDesc,
      ]
    ); // todo use countryid as well
    const response = {
      message: "Added product successfully",
      status: true,
    };
    res.status(201).json(response).end();
  } catch (error: any) {
    console.log("--error ", error.stack);
    response = {
      message: error.message,
      status: false,
      data: false,
    };
    res.status(401).json(response).end();
  }
};

/**
 * @route /products/fetch-products
 * @access PUBLIC
 * @type POST
 * @desc sends a list of products in paginated way
 */
export const fetchProducts = async (req: Request, res: Response) => {
  let response: IResponseData;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Invalid parameters");
    }
    const { pageIndex, pageSize } = req.body;
    if (pageSize > 100 || pageIndex > 100) {
      throw new Error("Pagination overflow");
    }
    const { rows } = await executeSql(
      `
    SELECT PRODUCT_ID as "id",
    PRODUCT_NAME as "productName",
    PRODUCT_IMAGE as "productImage",
    QUANTITY as "quantity",
    (SELECT CATEGORY_NAME
		FROM BAZAAR_CATEGORIES BC
		WHERE BC.CATEGORY_ID = BP.CATEGORY_ID) as "category", 
    CREATED_ON as "createdOn",
    UPDATED_ON as "updatedOn",
    STATUS as "status",
    PRICE as "price",
    DELIVERY_PRICE as "deliveryPrice",
    PRODUCT_DESC as "productDescription",
    (select country_name from bazaar_countries bc 
	 where bc.country_id = bp.country_id ) as "country",
   count(*) over() as "totalProducts"
    FROM PUBLIC.BAZAAR_PRODUCTS BP
    LIMIT $1
    OFFSET $2;
    `,
      [+pageSize, +pageIndex * +pageSize]
    );
    const response = {
      message: "Fetched products",
      status: true,
      data: rows,
    };
    res.status(201).json(response).end();
    return;
  } catch (error: any) {
    console.log(error.message);
    response = {
      message: error.message,
      status: false,
      data: false,
    };
    res.status(401).json(response).end();
  }
};

// @route: /products/readOne
export const readOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.body;
    const columns =
      "CATEGORY_ID, PRODUCT_NAME, PRODUCT_IMAGE, QUANTITY,STATUS, PRICE, DELIVERY_PRICE, PRODUCT_DESC";
    const table = "BAZAAR_PRODUCTS";
    const whereCondition = "PRODUCT_ID = $1";
    const sql = `SELECT ${columns} FROM ${table} WHERE ${whereCondition}`;
    const { rows } = await executeSql(sql, [productId]);
    const response = {
      message: "Fetched Product",
      status: true,
      data: rows[0],
    };
    res.status(201).json(response).end();
  } catch (error: any) {
    next(error);
  }
};
