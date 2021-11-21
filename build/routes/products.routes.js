"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var products_controllers_1 = require("../controllers/products.controllers");
var router = express_1.default.Router();
router.get("/get-categories", function (req, res) { return (0, products_controllers_1.getCategories)(req, res); });
router.post("/insert-product", (0, express_validator_1.body)("productName").notEmpty().escape(), (0, express_validator_1.body)("categoryId").notEmpty().isNumeric(), (0, express_validator_1.body)("quantity").notEmpty().isNumeric(), (0, express_validator_1.body)("status").notEmpty().isString(), (0, express_validator_1.body)("productImage").notEmpty(), (0, express_validator_1.body)("price").notEmpty().isNumeric(), (0, express_validator_1.body)("deliveryPrice").notEmpty().isNumeric(), (0, express_validator_1.body)("productDesc").notEmpty().escape(), (0, express_validator_1.body)("countryId").notEmpty().isNumeric(), function (req, res) { return (0, products_controllers_1.insertProduct)(req, res); });
module.exports = router;
