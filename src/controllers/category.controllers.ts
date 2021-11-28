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
  const { rows } = await executeSql(
    "SELECT category_id, category_name, created_on, category_image, status, parent_category_id FROM public.bazaar_categories where status = 'ACTIVE';"
  );
  response = {
    message: "Fetched categories",
    status: true,
    data: rows,
  };
  res.status(201).json(response).end();
};

