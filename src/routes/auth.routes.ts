import express, { Request, Response } from "express";
import { body } from "express-validator";
import { login, logout, register } from "../controllers/auth.controllers";
const router = express.Router();

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  (req: Request, res: Response) => login(req, res)
);

router.get("/logout", (req: Request, res: Response) => logout(req, res));

module.exports = router;
