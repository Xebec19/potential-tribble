import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { request } from "http";
import { login, register } from "../controllers/auth.controllers";
const router = express.Router();

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  (req: Request, res: Response) => login(req, res)
);

router.post(
  "register",
  body("email").isEmail(),
  body("firstName").trim().isString().notEmpty(),
  body("lastName").escape(),
  body("phone").isLength({ min: 8 }),
  body("password").isLength({ min: 5 }),
  (req: Request, res: Response) => register(req, res)
);

module.exports = router;
