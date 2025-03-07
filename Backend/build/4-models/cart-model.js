"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var CartModel = /** @class */ (function () {
    function CartModel(cart) {
        this.cartId = cart.cartId;
        this.userId = cart.userId;
        this.startDate = cart.startDate;
        this.isActive = cart.isActive;
    }
    CartModel.prototype.validatePost = function () {
        var _a;
        var result = CartModel.postValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    CartModel.prototype.validatePut = function () {
        var _a;
        var result = CartModel.putValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    CartModel.prototype.validatePatch = function () {
        var _a;
        var result = CartModel.patchValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    CartModel.postValidationSchema = joi_1.default.object({
        cartId: joi_1.default.forbidden(),
        userId: joi_1.default.number().required().min(1),
        startDate: joi_1.default.string().required().min(2).max(50),
        isActive: joi_1.default.string().optional().min(2).max(50)
    });
    CartModel.putValidationSchema = joi_1.default.object({
        cartId: joi_1.default.number().required().integer().min(1),
        userId: joi_1.default.number().required().min(1),
        startDate: joi_1.default.string().required().min(2).max(50),
        isActive: joi_1.default.string().optional().min(2).max(50)
    });
    CartModel.patchValidationSchema = joi_1.default.object({
        cartId: joi_1.default.number().optional().integer().min(1),
        userId: joi_1.default.number().optional().min(1),
        startDate: joi_1.default.string().optional().min(2).max(50),
        isActive: joi_1.default.string().optional().min(2).max(50)
    });
    return CartModel;
}());
exports.default = CartModel;
