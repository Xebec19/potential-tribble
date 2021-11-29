import { Request, Response } from "express";
import { executeSql } from "../db/executeQuery";
import { IResponseData } from "../models/index.model";

/**
 * @type GET
 * @route /categories/table
 * @access PRIVATE
 */
export const categoryTable = async (req: Request, res: Response) => {
  let response: IResponseData;
  const { pageSize = 40, pageIndex = 0 } = req.body;
  const offset = +pageSize * +pageIndex ?? 0;
  const limit = +pageSize ?? 0;
  let sql =
    "SELECT category_id, category_name, created_on, category_image, status, parent_category_id, count(*) over() as total FROM  public.bazaar_categories where status = 'ACTIVE' LIMIT " +
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
};
