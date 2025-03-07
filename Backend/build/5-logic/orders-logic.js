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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dal_1 = __importDefault(require("../2-utils/dal"));
var errors_model_1 = require("../4-models/errors-model");
// Get All Orders:
function getAllOrders() {
    return __awaiter(this, void 0, void 0, function () {
        var sql, orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT * FROM orders";
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    orders = _a.sent();
                    return [2 /*return*/, orders];
            }
        });
    });
}
// Get One Order:
function getOneOrder(orderId) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, orders, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT * FROM orders WHERE orderId=? \n                   ";
                    return [4 /*yield*/, dal_1.default.execute(sql, orderId)];
                case 1:
                    orders = _a.sent();
                    order = orders[0];
                    if (!order) {
                        throw new errors_model_1.ResourceNotFoundError(orderId);
                    }
                    return [2 /*return*/, order];
            }
        });
    });
}
// Get Orders By User:
function getOrdersByUser(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT * FROM orders WHERE userId=?";
                    return [4 /*yield*/, dal_1.default.execute(sql, userId)];
                case 1:
                    orders = _a.sent();
                    return [2 /*return*/, orders];
            }
        });
    });
}
// For Validation:
function getOrdersByDeliveryDate(deliveryDate) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT * FROM orders WHERE deliveryDate = ?";
                    return [4 /*yield*/, dal_1.default.execute(sql, deliveryDate)];
                case 1:
                    orders = _a.sent();
                    return [2 /*return*/, orders];
            }
        });
    });
}
// Add New Order:
function addNewOrder(order) {
    return __awaiter(this, void 0, void 0, function () {
        var ordersByDeliveryDate, errors, dotIndex, last4numbers, sql, values, result, addedOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getOrdersByDeliveryDate(order.deliveryDate)];
                case 1:
                    ordersByDeliveryDate = _a.sent();
                    errors = order.validatePost();
                    if (errors) {
                        throw new errors_model_1.ValidationError(errors);
                    }
                    if (ordersByDeliveryDate.length >= 3) {
                        throw new errors_model_1.ValidationError("The Delivery Date '".concat(order.deliveryDate, "' Exists"));
                    }
                    dotIndex = order.creditCard.lastIndexOf("", 12);
                    last4numbers = order.creditCard.substring(dotIndex);
                    order.creditCard = "************" + last4numbers;
                    sql = "INSERT INTO orders(userId, cartId, totalPrice, city, street, deliveryDate, orderDate, creditCard)\n                 VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
                    values = [order.userId, order.cartId, order.totalPrice, order.city, order.street, order.deliveryDate, order.orderDate, order.creditCard];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 2:
                    result = _a.sent();
                    order.orderId = result.insertId;
                    addedOrder = getOneOrder(order.orderId);
                    return [2 /*return*/, addedOrder];
            }
        });
    });
}
exports.default = {
    getAllOrders: getAllOrders,
    getOrdersByUser: getOrdersByUser,
    addNewOrder: addNewOrder
};
