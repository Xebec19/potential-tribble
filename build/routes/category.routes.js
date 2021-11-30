"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var category_controllers_1 = require("../controllers/category.controllers");
var router = express_1.default.Router();
router.post("/category-table", function (req, res, next) {
    return (0, category_controllers_1.categoryTable)(req, res, next);
});
router.post("/insert", (0, express_validator_1.body)("categoryName").notEmpty().escape(), (0, express_validator_1.body)("category")); // todo make routes for insert and update
module.exports = router;
