import express, { NextFunction, Request, Response } from "express";
import shoppingLogic from "../5-logic/shopping-logic";
import CartModel from "../4-models/cart-model";
import ItemModel from "../4-models/item-model";

const router = express.Router();

// GET http://localhost:3001/api/shopping/carts
router.get("/carts", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const carts = await shoppingLogic.getAllCarts();
        response.json(carts);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/shopping/carts/7 <-- id
router.get("/carts/:cartId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cartId = +request.params.cartId;
        const cart = await shoppingLogic.getOneCart(cartId);
        response.json(cart);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/shopping/items
router.get("/items", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const items = await shoppingLogic.getAllItems();
        response.json(items);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/shopping/carts-by-user
router.get("/carts-by-user/:userId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        const carts = await shoppingLogic.getCartsByUser(userId);
        response.json(carts);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/shopping/items-by-cart/:cartId
router.get("/items-by-cart/:cartId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cartId = +request.params.cartId;
        const items = await shoppingLogic.getItemsByCart(cartId);
        response.json(items);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/shopping/carts
router.post("/carts",  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cart = new CartModel(request.body);
        const addedCart = await shoppingLogic.addNewCart(cart);
        response.status(201).json(addedCart);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/shopping/items
router.post("/items", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const item = new ItemModel(request.body);
        const addedItem = await shoppingLogic.addNewItem(item);
        response.status(201).json(addedItem);
    }
    catch (err: any) {
        next(err);
    }
});

// PATCH http://localhost:3001/api/shopping/items/7 <-- id
router.patch("/items/:itemId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Take ID from request into the body: 
        request.body.itemId = +request.params.itemId;
        const item = new ItemModel(request.body);
        const updatedItem = await shoppingLogic.updatePartialItem(item);
        response.json(updatedItem);
    }
    catch (err: any) {
        next(err);
    }
});

// PATCH http://localhost:3001/api/shopping/carts/7 <-- id
router.patch("/carts/:cartId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Take ID from request into the body: 
        request.body.cartId = +request.params.cartId;
        const cart = new CartModel(request.body);
        const updatedCart = await shoppingLogic.updatePartialCart(cart);
        response.json(updatedCart);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:3001/api/shopping/items/7 <-- id
router.delete("/items/:itemId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const itemId = +request.params.itemId;
        await shoppingLogic.deleteItem(itemId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:3001/api/shopping/carts/7 <-- id
router.delete("/carts/:cartId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cartId = +request.params.cartId;
        await shoppingLogic.clearCart(cartId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;