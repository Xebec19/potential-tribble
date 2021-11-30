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
exports.readOne = exports.updateCategory = exports.insertCategory = exports.categoryTable = void 0;
var express_validator_1 = require("express-validator");
var executeQuery_1 = require("../db/executeQuery");
/**
 * @type GET
 * @route /categories/table
 * @access PRIVATE
 * @desc for category table
 */
var categoryTable = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var response, _a, _b, pageSize, _c, pageIndex, offset, limit, sql, rows, error_1;
    var _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 2, , 3]);
                response = void 0;
                _a = req.body, _b = _a.pageSize, pageSize = _b === void 0 ? 40 : _b, _c = _a.pageIndex, pageIndex = _c === void 0 ? 0 : _c;
                offset = (_d = +pageSize * +pageIndex) !== null && _d !== void 0 ? _d : 0;
                limit = (_e = +pageSize) !== null && _e !== void 0 ? _e : 0;
                sql = "SELECT category_id, category_name, created_on, status, parent_category_id, count(*) over() as total FROM  public.bazaar_categories where lower(status) = lower('ACTIVE') LIMIT " +
                    limit +
                    " OFFSET " +
                    offset;
                return [4 /*yield*/, (0, executeQuery_1.executeSql)(sql)];
            case 1:
                rows = (_f.sent()).rows;
                response = {
                    message: "Fetched categories",
                    status: true,
                    data: rows,
                };
                res.status(201).json(response).end();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _f.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.categoryTable = categoryTable;
/**
 *  @route /category/insert
 *  @type POST
 *  @access PRIVATE
 *  @desc endpoint to insert new category
 */
var insertCategory = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, response, _a, categoryName, status, parentId, table, columns, sql, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    throw new Error("Invalid parameters");
                }
                response = void 0;
                _a = req.body, categoryName = _a.categoryName, status = _a.status, parentId = _a.parentId;
                table = "bazaar_categories";
                columns = "category_name, status, parent_category_id";
                sql = "INSERT INTO " + table + " (" + columns + ") values ($1,$2,$3)";
                return [4 /*yield*/, (0, executeQuery_1.executeSql)(sql, [categoryName, status, parentId])];
            case 1:
                _b.sent();
                response = {
                    message: "Category inserted successfully",
                    status: true,
                };
                res.status(201).json(response).end();
                return [2 /*return*/];
            case 2:
                error_2 = _b.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.insertCategory = insertCategory;
/**
 *  @route /category/update
 *  @type POST
 *  @access PRIVATE
 *  @desc endpoint to update category
 */
var updateCategory = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, response, _a, categoryId, categoryName, status, parentId, table, sql, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    throw new Error("Invalid parameters");
                }
                response = void 0;
                _a = req.body, categoryId = _a.categoryId, categoryName = _a.categoryName, status = _a.status, parentId = _a.parentId;
                table = "bazaar_categories";
                sql = "UPDATE " + table + " set category_name = $1, status = $2, parent_category_id = $3 WHERE category_id = $4";
                return [4 /*yield*/, (0, executeQuery_1.executeSql)(sql, [categoryName, status, parentId, categoryId])];
            case 1:
                _b.sent();
                response = {
                    message: "Category updated successfully",
                    status: true,
                };
                res.status(201).json(response).end();
                return [2 /*return*/];
            case 2:
                error_3 = _b.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateCategory = updateCategory;
/**
 * @route category/readOne
 * @type POST
 * @desc fetches data of one category
 * @access PRIVATE
 */
var readOne = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, response, categoryId, table, columns, where, sql, rows, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    throw new Error("Invalid parameters");
                }
                response = void 0;
                categoryId = req.body.categoryId;
                table = "bazaar_categories";
                columns = "CATEGORY_NAME,	upper(STATUS) as \"status\",PARENT_CATEGORY_ID";
                where = " CATEGORY_ID = $1 AND LOWER(STATUS) = LOWER('active') ";
                sql = " SELECT " + columns + " from " + table + " where " + where;
                return [4 /*yield*/, (0, executeQuery_1.executeSql)(sql, [categoryId])];
            case 1:
                rows = (_a.sent()).rows;
                response = {
                    message: "Category fetched",
                    status: true,
                    data: rows[0],
                };
                res.status(201).json(response).end();
                return [2 /*return*/];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.readOne = readOne;
