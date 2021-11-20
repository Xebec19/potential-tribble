import express, { Request, Response } from "express";
import { body } from "express-validator";
import { login, register } from "../controllers/auth.controllers";
const router = express.Router();

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  (req: Request, res: Response) => login(req, res)
);

module.exports = router;
