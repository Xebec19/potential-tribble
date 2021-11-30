import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { executeSql } from "../db/executeQuery";
import { IResponseData } from "../models/index.model";

/**
 * @type GET
 * @route /categories/table
 * @access PRIVATE
 * @desc for category table
 */
export const categoryTable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let response: IResponseData;
    const { pageSize = 40, pageIndex = 0 } = req.body;
    const offset = +pageSize * +pageIndex ?? 0;
    const limit = +pageSize ?? 0;
    let sql =
      "SELECT category_id, category_name, created_on, status, parent_category_id, count(*) over() as total FROM  public.bazaar_categories where lower(status) = lower('ACTIVE') LIMIT " +
      limit +
      " OFFSET " +
      offset;
    const { rows } = await executeSql(sql);
    response = {
      message: "Fetched categories",
      status: true,
      data: rows,
    };
    res.status(201).json(response).end();
  } catch (error: any) {
    next(error);
  }
};

/**
 *  @route /category/insert
 *  @type POST
 *  @access PRIVATE
 *  @desc endpoint to insert new category
 */
export const insertCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Invalid parameters");
    }
    let response: IResponseData;
    const { categoryName, status, parentId } = req.body;
    const table = "bazaar_categories";
    const columns = "category_name, status, parent_category_id";
    const sql = `INSERT INTO ${table} (${columns}) values ($1,$2,$3)`;
    await executeSql(sql, [categoryName, status, parentId]);
    response = {
      message: "Category inserted successfully",
      status: true,
    };
    res.status(201).json(response).end();
    return;
  } catch (error) {
    next(error);
  }
};

/**
 *  @route /category/update
 *  @type POST
 *  @access PRIVATE
 *  @desc endpoint to update category
 */
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Invalid parameters");
    }
    let response: IResponseData;
    const { categoryId, categoryName, status, parentId } = req.body;
    const table = "bazaar_categories";
    const sql = `UPDATE ${table} set category_name = $1, status = $2, parent_category_id = $3 WHERE category_id = $4`;
    await executeSql(sql, [categoryName, status, parentId, categoryId]);
    response = {
      message: "Category updated successfully",
      status: true,
    };
    res.status(201).json(response).end();
    return;
  } catch (error: any) {
    next(error);
  }
};

/**
 * @route category/readOne
 * @type POST
 * @desc fetches data of one category
 * @access PRIVATE
 */
export const readOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Invalid parameters");
    }
    let response: IResponseData;
    const { categoryId } = req.body;
    const table = "bazaar_categories";
    const columns = "CATEGORY_NAME,	upper(STATUS) as \"status\",PARENT_CATEGORY_ID";
    const where = " CATEGORY_ID = $1 AND LOWER(STATUS) = LOWER('active') ";
    const sql = ` SELECT ${columns} from ${table} where ${where}`;
    const { rows } = await executeSql(sql, [categoryId]);
    response = {
      message: "Category fetched",
      status: true,
      data: rows[0],
    };
    res.status(201).json(response).end();
    return;
  } catch (error: any) {
    next(error);
  }
};
