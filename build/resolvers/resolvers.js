"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nanoid_1 = require("nanoid");
var Course = /** @class */ (function () {
    function Course(id, _a) {
        var courseName = _a.courseName, category = _a.category, price = _a.price, language = _a.language, email = _a.email, stack = _a.stack, teachingAssists = _a.teachingAssists;
        this.id = id;
        this.courseName = courseName;
        this.price = price;
        this.email = email;
        this.stack = stack;
        this.teachingAssists = teachingAssists;
    }
    return Course;
}());
var courseHolder = {};
var resolvers = {
    getCourse: function (_a) {
        var id = _a.id;
        return new Course(id, courseHolder[id]);
    },
    createCourse: function (_a) {
        var input = _a.input;
        var id = (0, nanoid_1.nanoid)();
        courseholder[id] = input;
        return new Course(id, input);
    }
};
exports.default = resolvers;
