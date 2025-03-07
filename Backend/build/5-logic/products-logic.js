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
var uuid_1 = require("uuid");
var dal_1 = __importDefault(require("../2-utils/dal"));
var errors_model_1 = require("../4-models/errors-model");
var product_model_1 = __importDefault(require("../4-models/product-model"));
// Get All Categories:
function getAllCategories() {
    return __awaiter(this, void 0, void 0, function () {
        var sql, categories;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT * FROM categories";
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    categories = _a.sent();
                    return [2 /*return*/, categories];
            }
        });
    });
}
// Get All Products:
function getAllProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var sql, products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT * FROM products";
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    products = _a.sent();
                    return [2 /*return*/, products];
            }
        });
    });
}
// Get one Product: 
function getOneProduct(productId) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, products, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT * FROM products WHERE productId=?;\n                ";
                    return [4 /*yield*/, dal_1.default.execute(sql, productId)];
                case 1:
                    products = _a.sent();
                    product = products[0];
                    if (!product) {
                        throw new errors_model_1.ResourceNotFoundError(productId);
                    }
                    return [2 /*return*/, product];
            }
        });
    });
}
// Get Products By Category:
function getProductsByCategory(categoryId) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT * FROM products JOIN categories\n                 ON products.categoryId = categories.categoryId\n                 WHERE products.categoryId = ".concat(categoryId);
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    products = _a.sent();
                    return [2 /*return*/, products];
            }
        });
    });
}
// Add New Product:
function addNewProduct(product) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, dotIndex, extension, sql, values, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = product.validatePost();
                    if (errors) {
                        throw new errors_model_1.ValidationError(errors);
                    }
                    return [4 /*yield*/, isNameExist(product.productName)];
                case 1:
                    if (_a.sent()) {
                        throw new errors_model_1.ValidationError("The product '".concat(product.productName, "' exists"));
                    }
                    if (!product.image) return [3 /*break*/, 3];
                    dotIndex = product.image.name.lastIndexOf(".");
                    extension = product.image.name.substring(dotIndex);
                    product.imageName = (0, uuid_1.v4)() + extension; // a3c0807a-c034-4370-854d-55612c954d83.png / 741cb7c1-422f-4476-a456-b692b2e880b8.jpg
                    // Save in disk: 
                    return [4 /*yield*/, product.image.mv("./1-assets/images/" + product.imageName)];
                case 2:
                    // Save in disk: 
                    _a.sent();
                    // Don't return back image file: 
                    delete product.image;
                    _a.label = 3;
                case 3:
                    sql = "INSERT INTO products(productName, categoryId, price, imageName)\n                 VALUES(?, ?, ?, ?)";
                    values = [product.productName, product.categoryId, product.price, product.imageName];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 4:
                    result = _a.sent();
                    product.productId = result.insertId;
                    return [2 /*return*/, product];
            }
        });
    });
}
// Update full product: 
function updateFullProduct(product) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, dotIndex, extension, sql, values, result, updatedProduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = product.validatePut();
                    if (errors) {
                        throw new errors_model_1.ValidationError(errors);
                    }
                    if (!product.image) return [3 /*break*/, 2];
                    dotIndex = product.image.name.lastIndexOf(".");
                    extension = product.image.name.substring(dotIndex);
                    product.imageName = (0, uuid_1.v4)() + extension; // a3c0807a-c034-4370-854d-55612c954d83.png / 741cb7c1-422f-4476-a456-b692b2e880b8.jpg
                    // Save in disk: 
                    return [4 /*yield*/, product.image.mv("./1-assets/images/" + product.imageName)];
                case 1:
                    // Save in disk: 
                    _a.sent();
                    // Don't return back image file: 
                    delete product.image;
                    _a.label = 2;
                case 2:
                    sql = "UPDATE products SET \n                 productName = ?,\n                 categoryId = ?,\n                 price = ?,\n                 imageName = ?\n                 WHERE productId = ?";
                    values = [product.productName, product.categoryId, product.price, product.imageName, product.productId];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 3:
                    result = _a.sent();
                    if (result.affectedRows === 0) {
                        throw new errors_model_1.ResourceNotFoundError(product.productId);
                    }
                    return [4 /*yield*/, getOneProduct(product.productId)];
                case 4:
                    updatedProduct = _a.sent();
                    return [2 /*return*/, updatedProduct];
            }
        });
    });
}
// Update partial product: 
function updatePartialProduct(product) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, dbProduct, prop, updatedProduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = product.validatePatch();
                    if (errors) {
                        throw new errors_model_1.ValidationError(errors);
                    }
                    return [4 /*yield*/, getOneProduct(product.productId)];
                case 1:
                    dbProduct = _a.sent();
                    for (prop in dbProduct) {
                        // Save the props if we send new props (apart from image):
                        if (product[prop] !== undefined) {
                            dbProduct[prop] = product[prop];
                        }
                        // Save the image if we send new image:
                        if (product.image !== undefined) {
                            dbProduct.image = product.image;
                        }
                    }
                    return [4 /*yield*/, updateFullProduct(new product_model_1.default(dbProduct))];
                case 2:
                    updatedProduct = _a.sent();
                    return [2 /*return*/, updatedProduct];
            }
        });
    });
}
// Delete Product:
function deleteProduct(productId) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "DELETE FROM products WHERE productId = ?";
                    return [4 /*yield*/, dal_1.default.execute(sql, productId)];
                case 1:
                    result = _a.sent();
                    if (result.affectedRows === 0) {
                        throw new errors_model_1.ResourceNotFoundError(productId);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Validation:
function isNameExist(productName) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, values, result, isExists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT EXISTS(SELECT * FROM products WHERE productName = ?) as isExists";
                    values = [productName];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 1:
                    result = _a.sent();
                    isExists = result[0].isExists;
                    return [2 /*return*/, isExists === 1];
            }
        });
    });
}
exports.default = {
    getAllCategories: getAllCategories,
    getAllProducts: getAllProducts,
    getOneProduct: getOneProduct,
    getProductsByCategory: getProductsByCategory,
    addNewProduct: addNewProduct,
    updateFullProduct: updateFullProduct,
    updatePartialProduct: updatePartialProduct,
    deleteProduct: deleteProduct
};
