"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var auth_controllers_1 = require("../controllers/auth.controllers");
var router = express_1.default.Router();
router.post("/login", (0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("password").isLength({ min: 5 }), function (req, res) { return (0, auth_controllers_1.login)(req, res); });
router.post("register", (0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("firstName").trim().isString().notEmpty(), (0, express_validator_1.body)("lastName").escape(), (0, express_validator_1.body)("phone").isLength({ min: 8 }), (0, express_validator_1.body)("password").isLength({ min: 5 }), function (req, res) { return (0, auth_controllers_1.register)(req, res); });
module.exports = router;
