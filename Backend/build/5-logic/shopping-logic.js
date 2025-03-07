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
var cart_model_1 = __importDefault(require("../4-models/cart-model"));
var errors_model_1 = require("../4-models/errors-model");
var item_model_1 = __importDefault(require("../4-models/item-model"));
var products_logic_1 = __importDefault(require("./products-logic"));
// Get All Carts:
function getAllCarts() {
    return __awaiter(this, void 0, void 0, function () {
        var sql, carts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT * FROM carts";
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    carts = _a.sent();
                    return [2 /*return*/, carts];
            }
        });
    });
}
// Get One Cart:
function getOneCart(cartId) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, carts, cart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT * FROM carts WHERE cartId=? \n                   ";
                    return [4 /*yield*/, dal_1.default.execute(sql, cartId)];
                case 1:
                    carts = _a.sent();
                    cart = carts[0];
                    if (!cart) {
                        throw new errors_model_1.ResourceNotFoundError(cartId);
                    }
                    return [2 /*return*/, cart];
            }
        });
    });
}
// Get All Items:
function getAllItems() {
    return __awaiter(this, void 0, void 0, function () {
        var sql, items;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT * FROM items \n                 LEFT JOIN products\n                 ON items.productId=products.productId";
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    items = _a.sent();
                    return [2 /*return*/, items];
            }
        });
    });
}
// Get One Item:
function getOneItem(itemId) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, items, item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT * FROM items\n                 LEFT JOIN products\n                 ON items.productId=products.productId\n                 WHERE itemId=? \n                   ";
                    return [4 /*yield*/, dal_1.default.execute(sql, itemId)];
                case 1:
                    items = _a.sent();
                    item = items[0];
                    if (!item) {
                        throw new errors_model_1.ResourceNotFoundError(itemId);
                    }
                    return [2 /*return*/, item];
            }
        });
    });
}
// Get Carts By User: 
function getCartsByUser(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, carts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT * FROM carts WHERE userId=?;\n                ";
                    return [4 /*yield*/, dal_1.default.execute(sql, userId)];
                case 1:
                    carts = _a.sent();
                    return [2 /*return*/, carts];
            }
        });
    });
}
// Get Items By Cart:
function getItemsByCart(cartId) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, items;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT * FROM items\n                 LEFT JOIN products\n                 ON items.productId=products.productId\n                 WHERE items.cartId = ".concat(cartId);
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    items = _a.sent();
                    return [2 /*return*/, items];
            }
        });
    });
}
// Add New Cart:
function addNewCart(cart) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, sql, values, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = cart.validatePost();
                    if (errors) {
                        throw new errors_model_1.ValidationError(errors);
                    }
                    cart.isActive = "Yes";
                    sql = "INSERT INTO carts(userId, startDate, isActive)\n                 VALUES(?, ?, ?)";
                    values = [cart.userId, cart.startDate, cart.isActive];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 1:
                    result = _a.sent();
                    cart.cartId = result.insertId;
                    return [2 /*return*/, cart];
            }
        });
    });
}
// Update full Cart: 
function updateFullCart(cart) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, sql, values, result, updatedCart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = cart.validatePut();
                    if (errors) {
                        throw new errors_model_1.ValidationError(errors);
                    }
                    sql = "UPDATE carts SET \n                 userId = ?,\n                 startDate = ?,\n                 isActive = ?\n                 WHERE cartId = ?";
                    values = [cart.userId, cart.startDate, cart.isActive, cart.cartId];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 1:
                    result = _a.sent();
                    if (result.affectedRows === 0) {
                        throw new errors_model_1.ResourceNotFoundError(cart.cartId);
                    }
                    updatedCart = getOneCart(cart.cartId);
                    ;
                    return [2 /*return*/, updatedCart];
            }
        });
    });
}
// Update partial Cart: 
function updatePartialCart(cart) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, dbCart, prop, updatedCart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = cart.validatePatch();
                    if (errors) {
                        throw new errors_model_1.ValidationError(errors);
                    }
                    return [4 /*yield*/, getOneCart(cart.cartId)];
                case 1:
                    dbCart = _a.sent();
                    for (prop in dbCart) {
                        // Save the props if we send new props:
                        if (cart[prop] !== undefined) {
                            dbCart[prop] = cart[prop];
                        }
                    }
                    return [4 /*yield*/, updateFullCart(new cart_model_1.default(dbCart))];
                case 2:
                    updatedCart = _a.sent();
                    return [2 /*return*/, updatedCart];
            }
        });
    });
}
// Add New Item:
function addNewItem(item) {
    return __awaiter(this, void 0, void 0, function () {
        var product, totalPrice, errors, sql, values, result, addedItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, products_logic_1.default.getOneProduct(item.productId)];
                case 1:
                    product = _a.sent();
                    totalPrice = (item.amount) * (product.price);
                    // Change total price
                    item.totalPrice = totalPrice;
                    errors = item.validatePost();
                    if (errors) {
                        throw new errors_model_1.ValidationError(errors);
                    }
                    sql = "INSERT INTO items(productId, amount, totalPrice, cartId)\n                 VALUES(?, ?, ?, ?)";
                    values = [item.productId, item.amount, item.totalPrice, item.cartId];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 2:
                    result = _a.sent();
                    item.itemId = result.insertId;
                    addedItem = getOneItem(item.itemId);
                    return [2 /*return*/, addedItem];
            }
        });
    });
}
// Update full item: 
function updateFullItem(item) {
    return __awaiter(this, void 0, void 0, function () {
        var product, totalPrice, errors, sql, values, result, updatedItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, products_logic_1.default.getOneProduct(item.productId)];
                case 1:
                    product = _a.sent();
                    totalPrice = (item.amount) * (product.price);
                    // Change total price
                    item.totalPrice = totalPrice;
                    errors = item.validatePut();
                    if (errors) {
                        throw new errors_model_1.ValidationError(errors);
                    }
                    sql = "UPDATE items SET \n                 productId = ?,\n                 amount = ?,\n                 totalPrice = ?,\n                 cartId = ?\n                 WHERE itemId = ?";
                    values = [item.productId, item.amount, item.totalPrice, item.cartId, item.itemId];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 2:
                    result = _a.sent();
                    if (result.affectedRows === 0) {
                        throw new errors_model_1.ResourceNotFoundError(item.itemId);
                    }
                    updatedItem = getOneItem(item.itemId);
                    ;
                    return [2 /*return*/, updatedItem];
            }
        });
    });
}
// Update partial item: 
function updatePartialItem(item) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, dbItem, prop, updatedItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = item.validatePatch();
                    if (errors) {
                        throw new errors_model_1.ValidationError(errors);
                    }
                    return [4 /*yield*/, getOneItem(item.itemId)];
                case 1:
                    dbItem = _a.sent();
                    for (prop in dbItem) {
                        // Save the props if we send new props:
                        if (item[prop] !== undefined) {
                            dbItem[prop] = item[prop];
                        }
                    }
                    return [4 /*yield*/, updateFullItem(new item_model_1.default(dbItem))];
                case 2:
                    updatedItem = _a.sent();
                    return [2 /*return*/, updatedItem];
            }
        });
    });
}
// Clear Cart:
function clearCart(cartId) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "DELETE FROM items WHERE cartId = ?";
                    return [4 /*yield*/, dal_1.default.execute(sql, cartId)];
                case 1:
                    result = _a.sent();
                    if (result.affectedRows === 0) {
                        throw new errors_model_1.ResourceNotFoundError(cartId);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Delete Item:
function deleteItem(itemId) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "DELETE FROM items WHERE itemId = ?";
                    return [4 /*yield*/, dal_1.default.execute(sql, itemId)];
                case 1:
                    result = _a.sent();
                    if (result.affectedRows === 0) {
                        throw new errors_model_1.ResourceNotFoundError(itemId);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    getAllCarts: getAllCarts,
    getOneCart: getOneCart,
    getAllItems: getAllItems,
    getCartsByUser: getCartsByUser,
    getItemsByCart: getItemsByCart,
    addNewCart: addNewCart,
    updatePartialCart: updatePartialCart,
    addNewItem: addNewItem,
    updatePartialItem: updatePartialItem,
    clearCart: clearCart,
    deleteItem: deleteItem
};
