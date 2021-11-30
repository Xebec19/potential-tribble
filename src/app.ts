import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/products", require("./routes/products.routes"));
app.use("/public", require("./routes/auth.routes"));
app.use("/category", require("./routes/category.routes"));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('--error caught : ',err.stack);
  res.status(500).send("Something broke!").end();
  return;
});
export default app;
