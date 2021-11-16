import express,{ Request, Response } from "express"
import cors from 'cors';

import Ajv from 'ajv';
export const ajv = new Ajv();

const app = express()
const port = process.env.PORT || 4002

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.use("/products",require(""))

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})