"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var OrderModel = /** @class */ (function () {
    function OrderModel(order) {
        this.orderId = order.orderId;
        this.userId = order.userId;
        this.cartId = order.cartId;
        this.totalPrice = order.totalPrice;
        this.city = order.city;
        this.street = order.street;
        this.deliveryDate = order.deliveryDate;
        this.orderDate = order.orderDate;
        this.creditCard = order.creditCard;
    }
    OrderModel.prototype.validatePost = function () {
        var _a;
        var result = OrderModel.postValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    OrderModel.postValidationSchema = joi_1.default.object({
        orderId: joi_1.default.forbidden(),
        userId: joi_1.default.number().required().min(1),
        cartId: joi_1.default.number().required().min(1),
        totalPrice: joi_1.default.number().optional().min(2),
        city: joi_1.default.string().required().min(2).max(20),
        street: joi_1.default.string().required().min(2).max(30),
        deliveryDate: joi_1.default.string().required().min(2).max(50),
        orderDate: joi_1.default.string().required().min(2).max(50),
        creditCard: joi_1.default.string().optional().min(16).max(16)
    });
    return OrderModel;
}());
exports.default = OrderModel;
