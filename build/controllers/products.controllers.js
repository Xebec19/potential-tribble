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
exports.readOne = exports.fetchProducts = exports.insertProduct = exports.getCategories = void 0;
var express_validator_1 = require("express-validator");
var executeQuery_1 = require("../db/executeQuery");
var algolia_utils_1 = require("../utils/algolia.utils");
/**
 * @type GET
 * @route /products/get-categories
 * @access PRIVATE
 */
var getCategories = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, rows, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, executeQuery_1.executeSql)("SELECT CATEGORY_ID,CATEGORY_NAME FROM BAZAAR_CATEGORIES WHERE STATUS = 'ACTIVE'")];
            case 1:
                rows = (_a.sent()).rows;
                response = {
                    message: "Fetched categories",
                    status: true,
                    data: rows,
                };
                res.status(201).json(response).end();
                return [2 /*return*/];
            case 2:
                error_1 = _a.sent();
                console.log(error_1.message);
                response = {
                    message: error_1.message,
                    status: false,
                    data: false,
                };
                res.status(401).json(response).end();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCategories = getCategories;
/**
 * @route /products/insert-product
 * @parameters productName,categoryId,productImage,quantity,status,price,deliveryPrice,product Description,countryId
 * @desc insert new product in database
 * @type PRIVATE
 */
var insertProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, errors, _a, productId, productName, categoryId, quantity, status, productImage, price, deliveryPrice, productDesc, countryId, sql, rows, rows, response_1, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    throw new Error("Invalid parameters");
                }
                _a = req.body, productId = _a.productId, productName = _a.productName, categoryId = _a.categoryId, quantity = _a.quantity, status = _a.status, productImage = _a.productImage, price = _a.price, deliveryPrice = _a.deliveryPrice, productDesc = _a.productDesc, countryId = _a.countryId;
                if (!!!productId) return [3 /*break*/, 3];
                sql = "UPDATE PUBLIC.BAZAAR_PRODUCTS\n      SET \n        CATEGORY_ID = $1,\n        PRODUCT_NAME = $2,\n        PRODUCT_IMAGE = $3,\n        QUANTITY = $4,\n        UPDATED_ON = now(),\n        STATUS = $5,\n        PRICE = $6,\n        DELIVERY_PRICE = $7,\n        PRODUCT_DESC = $8,\n        COUNTRY_ID = 1\n      WHERE PRODUCT_ID = $9 returning PRODUCT_ID ;";
                return [4 /*yield*/, (0, executeQuery_1.executeSql)(sql, [
                        categoryId,
                        productName,
                        productImage,
                        quantity,
                        status,
                        price,
                        deliveryPrice,
                        productDesc,
                        productId,
                    ])];
            case 1:
                rows = (_b.sent()).rows;
                return [4 /*yield*/, (0, algolia_utils_1.updateAlgolia)(rows[0].product_id)];
            case 2:
                _b.sent();
                return [3 /*break*/, 6];
            case 3: return [4 /*yield*/, (0, executeQuery_1.executeSql)("\n      INSERT INTO PUBLIC.BAZAAR_PRODUCTS(\n        CATEGORY_ID,\n        PRODUCT_NAME,\n        PRODUCT_IMAGE,\n        QUANTITY,\n        STATUS,\n        PRICE,\n        DELIVERY_PRICE,\n        PRODUCT_DESC\n        )\n        VALUES ($1,$2,$3,$4,$5,$6,$7,$8) returning product_id;", [
                    categoryId,
                    productName,
                    productImage,
                    quantity,
                    status,
                    price,
                    deliveryPrice,
                    productDesc,
                ])];
            case 4:
                rows = (_b.sent()).rows;
                return [4 /*yield*/, (0, algolia_utils_1.updateAlgolia)(rows[0].product_id)];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                response_1 = {
                    message: "Added product successfully",
                    status: true,
                };
                res.status(201).json(response_1).end();
                return [3 /*break*/, 8];
            case 7:
                error_2 = _b.sent();
                console.log("--error ", error_2.stack);
                response = {
                    message: error_2.message,
                    status: false,
                    data: false,
                };
                res.status(401).json(response).end();
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.insertProduct = insertProduct;
/**
 * @route /products/fetch-products
 * @access PUBLIC
 * @type POST
 * @desc sends a list of products in paginated way
 */
var fetchProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, errors, _a, pageIndex, pageSize, rows, response_2, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    throw new Error("Invalid parameters");
                }
                _a = req.body, pageIndex = _a.pageIndex, pageSize = _a.pageSize;
                if (pageSize > 100 || pageIndex > 100) {
                    throw new Error("Pagination overflow");
                }
                return [4 /*yield*/, (0, executeQuery_1.executeSql)("\n    SELECT PRODUCT_ID as \"id\",\n    PRODUCT_NAME as \"productName\",\n    PRODUCT_IMAGE as \"productImage\",\n    QUANTITY as \"quantity\",\n    (SELECT CATEGORY_NAME\n\t\tFROM BAZAAR_CATEGORIES BC\n\t\tWHERE BC.CATEGORY_ID = BP.CATEGORY_ID) as \"category\", \n    CREATED_ON as \"createdOn\",\n    UPDATED_ON as \"updatedOn\",\n    STATUS as \"status\",\n    PRICE as \"price\",\n    DELIVERY_PRICE as \"deliveryPrice\",\n    PRODUCT_DESC as \"productDescription\",\n    (select country_name from bazaar_countries bc \n\t where bc.country_id = bp.country_id ) as \"country\",\n   count(*) over() as \"totalProducts\"\n    FROM PUBLIC.BAZAAR_PRODUCTS BP\n    LIMIT $1\n    OFFSET $2;\n    ", [+pageSize, +pageIndex * +pageSize])];
            case 1:
                rows = (_b.sent()).rows;
                response_2 = {
                    message: "Fetched products",
                    status: true,
                    data: rows,
                };
                res.status(201).json(response_2).end();
                return [2 /*return*/];
            case 2:
                error_3 = _b.sent();
                console.log(error_3.message);
                response = {
                    message: error_3.message,
                    status: false,
                    data: false,
                };
                res.status(401).json(response).end();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.fetchProducts = fetchProducts;
// @route: /products/readOne
var readOne = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, columns, table, whereCondition, sql, rows, response, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                productId = req.body.productId;
                columns = "CATEGORY_ID, PRODUCT_NAME, PRODUCT_IMAGE, QUANTITY,STATUS, PRICE, DELIVERY_PRICE, PRODUCT_DESC";
                table = "BAZAAR_PRODUCTS";
                whereCondition = "PRODUCT_ID = $1";
                sql = "SELECT " + columns + " FROM " + table + " WHERE " + whereCondition;
                return [4 /*yield*/, (0, executeQuery_1.executeSql)(sql, [productId])];
            case 1:
                rows = (_a.sent()).rows;
                response = {
                    message: "Fetched Product",
                    status: true,
                    data: rows[0],
                };
                res.status(201).json(response).end();
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.readOne = readOne;
