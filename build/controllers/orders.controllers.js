"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderInfo = exports.ordersTable = void 0;
var express_validator_1 = require("express-validator");
var executeQuery_1 = require("../db/executeQuery");
var getOrderInfo = function (orderId) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT ORDER_ID,\n    USER_ID,\n    PRICE,\n    DELIVERY_PRICE,\n    TOTAL,\n    CREATED_ON,\n    EMAIL,\n    ADDRESS\n    FROM PUBLIC.BAZAAR_ORDER\n    WHERE ORDER_ID = $1 LIMIT 1;";
                return [4 /*yield*/, (0, executeQuery_1.executeSql)(sql, ["" + orderId])];
            case 1:
                rows = (_a.sent()).rows;
                return [2 /*return*/, rows[0]];
        }
    });
}); };
var getOrderDetails = function (orderId) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT OD_ID,\n\tORDER_ID,\n\t(SELECT PRODUCT_NAME\n\t\tFROM BAZAAR_PRODUCTS\n\t\tWHERE PRODUCT_ID = OD.PRODUCT_ID),\n\t(SELECT PRODUCT_IMAGE\n\tFROM BAZAAR_PRODUCTS\n\tWHERE PRODUCT_ID = OD.PRODUCT_ID)\n\tproduct_price,quantity,delivery_price\n\tfrom bazaar_order_details od\n\twhere order_id = $1;";
                return [4 /*yield*/, (0, executeQuery_1.executeSql)(sql, ["" + orderId])];
            case 1:
                rows = (_a.sent()).rows;
                return [2 /*return*/, rows];
        }
    });
}); };
/**
 * @route /orders/table
 * @type POST
 * @access PRIVATE
 * @desc sends orders in pagination
 */
var ordersTable = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var response, errors, _a, pageSize, pageIndex, sql, rows, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                response = void 0;
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    throw new Error("Invalid parameters");
                }
                _a = req.body, pageSize = _a.pageSize, pageIndex = _a.pageIndex;
                sql = "SELECT ORDER_ID,USER_ID,PRICE,\tDELIVERY_PRICE,\tTOTAL,\tCREATED_ON,\tEMAIL,\tADDRESS, COUNT(*) OVER() AS \"totalOrders\" FROM PUBLIC.BAZAAR_ORDER LIMIT " + pageSize + " OFFSET " + pageSize * pageIndex + ";";
                return [4 /*yield*/, (0, executeQuery_1.executeSql)(sql)];
            case 1:
                rows = (_b.sent()).rows;
                response = {
                    message: "Orders fetched successfully",
                    status: true,
                    data: rows,
                };
                res.status(201).json(response).end();
                return [2 /*return*/];
            case 2:
                error_1 = _b.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.ordersTable = ordersTable;
/**
 * @route /orders/info
 * @type POST
 * @access PRIVATE
 * @desc sends order details
 */
var orderInfo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var response, errors, orderId, orderDetails, orderItems, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                response = void 0;
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    throw new Error("Invalid parameters");
                }
                orderId = req.body.orderId;
                return [4 /*yield*/, getOrderInfo(orderId)];
            case 1:
                orderDetails = _a.sent();
                return [4 /*yield*/, getOrderDetails(orderId)];
            case 2:
                orderItems = _a.sent();
                response = {
                    message: "Order details fetched successfully",
                    status: true,
                    data: { orderDetails: orderDetails, orderItems: orderItems },
                };
                res.status(201).json(response).end();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.orderInfo = orderInfo;
