"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbQuery = void 0;
var environments_1 = require("../environments/environments");
var Pool = require("pg").Pool;
var config = {
    user: "" + environments_1.dbUser,
    host: "" + environments_1.dbHost,
    database: "" + environments_1.dbDatabase,
    password: "" + environments_1.dbPassword,
    port: "" + environments_1.dbPort,
};
var pool = new Pool(config);
pool.on("error", function (err, client) {
    console.error("Error:", err);
});
console.log(config);
var dbQuery = function (text, params) { return pool.query(text, params); };
exports.dbQuery = dbQuery;
