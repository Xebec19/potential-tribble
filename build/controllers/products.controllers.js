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
exports.fetchProducts = exports.insertProduct = exports.getCategories = exports.categoryTable = void 0;
var express_validator_1 = require("express-validator");
var executeQuery_1 = require("../db/executeQuery");
/**
 * @type GET
 * @route /categories/table
 * @access PRIVATE
 */
var categoryTable = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, executeQuery_1.executeSql)("SELECT category_id, category_name, created_on, category_image, status, parent_category_id FROM public.bazaar_categories where status = 'ACTIVE';")];
            case 1:
                rows = (_a.sent()).rows;
                response = {
                    message: "Fetched categories",
                    status: true,
                    data: rows,
                };
                res.status(201).json(response).end();
                return [2 /*return*/];
        }
    });
}); };
exports.categoryTable = categoryTable;
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
    var response, errors, _a, productName, categoryId, quantity, status, productImage, price, deliveryPrice, productDesc, countryId, response_1, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    throw new Error("Invalid parameters");
                }
                _a = req.body, productName = _a.productName, categoryId = _a.categoryId, quantity = _a.quantity, status = _a.status, productImage = _a.productImage, price = _a.price, deliveryPrice = _a.deliveryPrice, productDesc = _a.productDesc, countryId = _a.countryId;
                return [4 /*yield*/, (0, executeQuery_1.executeSql)("\n      INSERT INTO PUBLIC.BAZAAR_PRODUCTS(\n        CATEGORY_ID,\n        PRODUCT_NAME,\n        PRODUCT_IMAGE,\n        QUANTITY,\n        STATUS,\n        PRICE,\n        DELIVERY_PRICE,\n        PRODUCT_DESC\n        )\n        VALUES ($1,$2,$3,$4,$5,$6,$7,$8);", [
                        categoryId,
                        productName,
                        productImage,
                        quantity,
                        status,
                        price,
                        deliveryPrice,
                        productDesc,
                    ])];
            case 1:
                _b.sent(); // todo use countryid as well
                response_1 = {
                    message: "Added product successfully",
                    status: true,
                };
                res.status(201).json(response_1).end();
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                console.log("--error ", error_2.stack);
                response = {
                    message: error_2.message,
                    status: false,
                    data: false,
                };
                res.status(401).json(response).end();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
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
                return [3 /*break*/, 3];
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
