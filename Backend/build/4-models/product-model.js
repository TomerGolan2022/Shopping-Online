"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var ProductModel = /** @class */ (function () {
    function ProductModel(product) {
        this.productId = product.productId;
        this.productName = product.productName;
        this.categoryId = product.categoryId;
        this.price = product.price;
        this.imageName = product.imageName;
        this.image = product.image;
    }
    ProductModel.prototype.validatePost = function () {
        var _a;
        var result = ProductModel.postValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    ProductModel.prototype.validatePut = function () {
        var _a;
        var result = ProductModel.putValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    ProductModel.prototype.validatePatch = function () {
        var _a;
        var result = ProductModel.patchValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    ProductModel.postValidationSchema = joi_1.default.object({
        productId: joi_1.default.forbidden(),
        productName: joi_1.default.string().required().min(2).max(50),
        categoryId: joi_1.default.number().required().integer().min(1),
        price: joi_1.default.number().required().min(1).max(300),
        imageName: joi_1.default.string().optional().min(2).max(50),
        image: joi_1.default.object().required()
    });
    ProductModel.putValidationSchema = joi_1.default.object({
        productId: joi_1.default.number().required().integer().min(1),
        productName: joi_1.default.string().required().min(2).max(50),
        categoryId: joi_1.default.number().required().integer().min(1),
        price: joi_1.default.number().required().min(1).max(300),
        imageName: joi_1.default.string().optional().min(2).max(50),
        image: joi_1.default.object().optional()
    });
    ProductModel.patchValidationSchema = joi_1.default.object({
        productId: joi_1.default.number().optional().integer().min(1),
        productName: joi_1.default.string().optional().min(2).max(50),
        categoryId: joi_1.default.number().optional().integer().min(1),
        price: joi_1.default.number().optional().min(1).max(300),
        imageName: joi_1.default.string().optional().min(2).max(50),
        image: joi_1.default.object().optional()
    });
    return ProductModel;
}());
exports.default = ProductModel;
