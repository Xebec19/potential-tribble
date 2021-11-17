import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../environments/environments";
import { IResponseData } from "../models/index.model";
export const decodeToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let response: IResponseData;
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const decoded = jwt.verify(
      `${token}`,
      `${jwtSecret}`,
      function (err, decoded) {
        if (err) {
          throw new Error(err.message);
        }

        next();
      }
    );
  } catch (error: any) {
    console.log(error.message);
    response = {
      message: error.message,
      status: false,
    };
    res.status(401).json({ message: error.message }).end();
    return;
  }
};
