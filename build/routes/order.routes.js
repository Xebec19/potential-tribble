"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var orders_controllers_1 = require("../controllers/orders.controllers");
var router = express_1.default.Router();
router.post("/table", (0, express_validator_1.body)("pageSize").notEmpty(), (0, express_validator_1.body)("pageIndex").notEmpty(), function (req, res, next) {
    return (0, orders_controllers_1.ordersTable)(req, res, next);
});
router.post("/info", (0, express_validator_1.body)("orderId").notEmpty().isString(), function (req, res, next) { return (0, orders_controllers_1.orderInfo)(req, res, next); });
router.post("/update-status", (0, express_validator_1.body)("orderId").notEmpty().isString(), (0, express_validator_1.body)("status").notEmpty().isString(), function (req, res, next) {
    return (0, orders_controllers_1.updateOrderStatus)(req, res, next);
});
module.exports = router;
