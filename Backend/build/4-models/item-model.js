"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var ItemModel = /** @class */ (function () {
    function ItemModel(cart) {
        this.itemId = cart.itemId;
        this.productId = cart.productId;
        this.amount = cart.amount;
        this.totalPrice = cart.totalPrice;
        this.cartId = cart.cartId;
    }
    ItemModel.prototype.validatePost = function () {
        var _a;
        var result = ItemModel.postValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    ItemModel.prototype.validatePut = function () {
        var _a;
        var result = ItemModel.putValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    ItemModel.prototype.validatePatch = function () {
        var _a;
        var result = ItemModel.patchValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    ItemModel.postValidationSchema = joi_1.default.object({
        itemId: joi_1.default.forbidden(),
        productId: joi_1.default.number().required().min(1),
        amount: joi_1.default.number().required().min(1).max(20),
        totalPrice: joi_1.default.number().optional().min(2),
        cartId: joi_1.default.number().required().min(1),
    });
    ItemModel.putValidationSchema = joi_1.default.object({
        itemId: joi_1.default.number().required().integer().min(1),
        productId: joi_1.default.number().required().min(1),
        amount: joi_1.default.number().required().min(1).max(20),
        totalPrice: joi_1.default.number().optional().min(2),
        cartId: joi_1.default.number().required().min(1),
    });
    ItemModel.patchValidationSchema = joi_1.default.object({
        itemId: joi_1.default.number().optional().integer().min(1),
        productId: joi_1.default.number().optional().min(1),
        amount: joi_1.default.number().optional().min(1).max(20),
        totalPrice: joi_1.default.number().optional().min(2),
        cartId: joi_1.default.number().optional().min(1),
    });
    return ItemModel;
}());
exports.default = ItemModel;
