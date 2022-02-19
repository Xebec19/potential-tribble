"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/products", require("./routes/products.routes"));
app.use("/public", require("./routes/auth.routes"));
app.use("/category", require("./routes/category.routes"));
app.use(function (err, req, res, next) {
    console.error('--error caught : ', err.stack);
    res.status(500).send("Something broke!").end();
    return;
});
exports.default = app;
