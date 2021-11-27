"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var products_controllers_1 = require("../controllers/products.controllers");
var router = express_1.default.Router();
router.get("/category-table", function (req, res) {
    return (0, products_controllers_1.categoryTable)(req, res);
});
module.exports = router;
