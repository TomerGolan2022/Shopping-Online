"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var config_1 = __importDefault(require("./2-utils/config"));
var catch_all_1 = __importDefault(require("./3-middleware/catch-all"));
var errors_model_1 = require("./4-models/errors-model");
var products_controllers_1 = __importDefault(require("./6-controllers/products-controllers"));
var auth_controller_1 = __importDefault(require("./6-controllers/auth-controller"));
var shopping_controllers_1 = __importDefault(require("./6-controllers/shopping-controllers"));
var orders_controllers_1 = __importDefault(require("./6-controllers/orders-controllers"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var path_1 = __importDefault(require("path"));
var expressServer = (0, express_1.default)();
expressServer.use((0, cors_1.default)());
expressServer.use((0, express_fileupload_1.default)());
expressServer.use(express_1.default.json());
expressServer.use("/api", products_controllers_1.default);
expressServer.use("/api/auth", auth_controller_1.default);
expressServer.use("/api/shopping", shopping_controllers_1.default);
expressServer.use("/api", orders_controllers_1.default);
expressServer.use(express_1.default.static(path_1.default.join(__dirname, "./7-frontend")));
expressServer.use("*", function (request, response, next) {
    if (config_1.default.isDevelopment) {
        var err = new errors_model_1.RouteNotFoundError(request.method, request.originalUrl);
        next(err);
    }
    else {
        response.sendFile(path_1.default.join(__dirname, "./7-frontend/index.html"));
    }
});
// expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
//     next(new RouteNotFoundError(request.method, request.originalUrl));
// });
expressServer.use(catch_all_1.default);
expressServer.listen(config_1.default.port, function () { return console.log("Listening on http://localhost:".concat(config_1.default.port)); });
