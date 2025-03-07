"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var UserModel = /** @class */ (function () {
    function UserModel(user) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.identifyNumber = user.identifyNumber;
        this.password = user.password;
        this.city = user.city;
        this.street = user.street;
        this.role = user.role;
    }
    UserModel.prototype.validatePost = function () {
        var _a;
        var result = UserModel.postValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    UserModel.prototype.validatePut = function () {
        var _a;
        var result = UserModel.putValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    UserModel.prototype.validatePatch = function () {
        var _a;
        var result = UserModel.patchValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    UserModel.postValidationSchema = joi_1.default.object({
        userId: joi_1.default.forbidden(),
        firstName: joi_1.default.string().required().min(2).max(50),
        lastName: joi_1.default.string().required().min(2).max(50),
        username: joi_1.default.string().required().min(2).max(50),
        identifyNumber: joi_1.default.string().required().min(9).max(9),
        password: joi_1.default.string().required().min(2).max(50),
        city: joi_1.default.string().required().min(2).max(20),
        street: joi_1.default.string().required().min(2).max(30),
        role: joi_1.default.string().optional().min(2).max(50)
    });
    UserModel.putValidationSchema = joi_1.default.object({
        userId: joi_1.default.number().required().integer().min(1),
        firstName: joi_1.default.string().required().min(2).max(50),
        lastName: joi_1.default.string().required().min(2).max(50),
        username: joi_1.default.string().required().min(2).max(50),
        identifyNumber: joi_1.default.string().required().min(9).max(9),
        password: joi_1.default.string().required().min(2).max(50),
        city: joi_1.default.string().required().min(2).max(20),
        street: joi_1.default.string().required().min(2).max(30),
        role: joi_1.default.string().optional().min(2).max(50)
    });
    UserModel.patchValidationSchema = joi_1.default.object({
        userId: joi_1.default.number().required().integer().min(1),
        firstName: joi_1.default.string().required().min(2).max(50),
        lastName: joi_1.default.string().required().min(2).max(50),
        username: joi_1.default.string().required().min(2).max(50),
        identifyNumber: joi_1.default.string().required().min(9).max(9),
        password: joi_1.default.string().required().min(2).max(50),
        city: joi_1.default.string().required().min(2).max(20),
        street: joi_1.default.string().required().min(2).max(30),
        role: joi_1.default.string().optional().min(2).max(50)
    });
    return UserModel;
}());
exports.default = UserModel;
