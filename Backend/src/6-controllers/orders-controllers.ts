import express, { NextFunction, Request, Response } from "express";
import shoppingLogic from "../5-logic/shopping-logic";
import CartModel from "../4-models/cart-model";
import ItemModel from "../4-models/item-model";
import OrderModel from "../4-models/order-model";
import ordersLogic from "../5-logic/orders-logic";
import verifyUser from "../3-middleware/verify-user";

const router = express.Router();

// GET http://localhost:3001/api/orders
router.get("/orders", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const orders = await ordersLogic.getAllOrders();
        response.json(orders);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/orders-by-user/4 <-- id
router.get("/orders-by-user/:userId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        const orders = await ordersLogic.getOrdersByUser(userId);
        response.json(orders);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/orders
router.post("/orders", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const order = new OrderModel(request.body);
        const addedOrder = await ordersLogic.addNewOrder(order);
        response.status(201).json(addedOrder);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;