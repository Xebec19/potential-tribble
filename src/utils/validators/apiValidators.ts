import Ajv from "ajv";
import { IreadProducts } from "../interfaces/products.interface";
import { SreadProducts } from "../schemas/product.schema";
const ajv = new Ajv({processCode: transpileFunc);
export const validate_readProducts = ajv.compile<IreadProducts>(SreadProducts);
