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
var express_1 = __importDefault(require("express"));
var shopping_logic_1 = __importDefault(require("../5-logic/shopping-logic"));
var cart_model_1 = __importDefault(require("../4-models/cart-model"));
var item_model_1 = __importDefault(require("../4-models/item-model"));
var router = express_1.default.Router();
// GET http://localhost:3001/api/shopping/carts
router.get("/carts", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var carts, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, shopping_logic_1.default.getAllCarts()];
            case 1:
                carts = _a.sent();
                response.json(carts);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET http://localhost:3001/api/shopping/carts/7 <-- id
router.get("/carts/:cartId([0-9]+)", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var cartId, cart, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                cartId = +request.params.cartId;
                return [4 /*yield*/, shopping_logic_1.default.getOneCart(cartId)];
            case 1:
                cart = _a.sent();
                response.json(cart);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET http://localhost:3001/api/shopping/items
router.get("/items", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var items, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, shopping_logic_1.default.getAllItems()];
            case 1:
                items = _a.sent();
                response.json(items);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                next(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET http://localhost:3001/api/shopping/carts-by-user
router.get("/carts-by-user/:userId([0-9]+)", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, carts, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = +request.params.userId;
                return [4 /*yield*/, shopping_logic_1.default.getCartsByUser(userId)];
            case 1:
                carts = _a.sent();
                response.json(carts);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                next(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET http://localhost:3001/api/shopping/items-by-cart/:cartId
router.get("/items-by-cart/:cartId([0-9]+)", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var cartId, items, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                cartId = +request.params.cartId;
                return [4 /*yield*/, shopping_logic_1.default.getItemsByCart(cartId)];
            case 1:
                items = _a.sent();
                response.json(items);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                next(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// POST http://localhost:3001/api/shopping/carts
router.post("/carts", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var cart, addedCart, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                cart = new cart_model_1.default(request.body);
                return [4 /*yield*/, shopping_logic_1.default.addNewCart(cart)];
            case 1:
                addedCart = _a.sent();
                response.status(201).json(addedCart);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                next(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// POST http://localhost:3001/api/shopping/items
router.post("/items", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var item, addedItem, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                item = new item_model_1.default(request.body);
                return [4 /*yield*/, shopping_logic_1.default.addNewItem(item)];
            case 1:
                addedItem = _a.sent();
                response.status(201).json(addedItem);
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                next(err_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// PATCH http://localhost:3001/api/shopping/items/7 <-- id
router.patch("/items/:itemId([0-9]+)", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var item, updatedItem, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                // Take ID from request into the body: 
                request.body.itemId = +request.params.itemId;
                item = new item_model_1.default(request.body);
                return [4 /*yield*/, shopping_logic_1.default.updatePartialItem(item)];
            case 1:
                updatedItem = _a.sent();
                response.json(updatedItem);
                return [3 /*break*/, 3];
            case 2:
                err_8 = _a.sent();
                next(err_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// PATCH http://localhost:3001/api/shopping/carts/7 <-- id
router.patch("/carts/:cartId([0-9]+)", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var cart, updatedCart, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                // Take ID from request into the body: 
                request.body.cartId = +request.params.cartId;
                cart = new cart_model_1.default(request.body);
                return [4 /*yield*/, shopping_logic_1.default.updatePartialCart(cart)];
            case 1:
                updatedCart = _a.sent();
                response.json(updatedCart);
                return [3 /*break*/, 3];
            case 2:
                err_9 = _a.sent();
                next(err_9);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// DELETE http://localhost:3001/api/shopping/items/7 <-- id
router.delete("/items/:itemId([0-9]+)", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var itemId, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                itemId = +request.params.itemId;
                return [4 /*yield*/, shopping_logic_1.default.deleteItem(itemId)];
            case 1:
                _a.sent();
                response.sendStatus(204);
                return [3 /*break*/, 3];
            case 2:
                err_10 = _a.sent();
                next(err_10);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// DELETE http://localhost:3001/api/shopping/carts/7 <-- id
router.delete("/carts/:cartId([0-9]+)", function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var cartId, err_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                cartId = +request.params.cartId;
                return [4 /*yield*/, shopping_logic_1.default.clearCart(cartId)];
            case 1:
                _a.sent();
                response.sendStatus(204);
                return [3 /*break*/, 3];
            case 2:
                err_11 = _a.sent();
                next(err_11);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
