import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./2-utils/config";
import catchAll from "./3-middleware/catch-all";
import { RouteNotFoundError } from "./4-models/errors-model";
import productsController from "./6-controllers/products-controllers";
import authController from "./6-controllers/auth-controller";
import shoppingController from "./6-controllers/shopping-controllers";
import ordersController from "./6-controllers/orders-controllers";
import fileUpload from "express-fileupload";
import path from "path";

const expressServer = express();

expressServer.use(cors());
expressServer.use(fileUpload());
expressServer.use(express.json());
expressServer.use("/api", productsController);
expressServer.use("/api/auth", authController);
expressServer.use("/api/shopping", shoppingController);
expressServer.use("/api", ordersController);
expressServer.use(express.static(path.join(__dirname, "./7-frontend")));

expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
    if (config.isDevelopment) {
        const err = new RouteNotFoundError(request.method, request.originalUrl);
        next(err);
    }
    else {
        response.sendFile(path.join(__dirname, "./7-frontend/index.html"));
    }
});

// expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
//     next(new RouteNotFoundError(request.method, request.originalUrl));
// });

expressServer.use(catchAll);

expressServer.listen(config.port, () => console.log(`Listening on http://localhost:${config.port}`));
