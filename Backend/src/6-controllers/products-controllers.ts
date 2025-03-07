import express, { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "fs";
import { RouteNotFoundError } from "../4-models/errors-model";
import ProductModel from "../4-models/product-model";
import productsLogic from "../5-logic/products-logic";

const router = express.Router();

// GET http://localhost:3001/api/categories
router.get("/categories",  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categories = await productsLogic.getAllCategories();
        response.json(categories);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/products
router.get("/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await productsLogic.getAllProducts();
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/products-by-category/:categoryId
router.get("/products-by-category/:categoryId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categoryId = +request.params.categoryId;
        const products = await productsLogic.getProductsByCategory(categoryId);
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/products
router.post("/products",  async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Take image from request into the body: 
        request.body.image = request.files.image;
        const product = new ProductModel(request.body);
        const addedProduct = await productsLogic.addNewProduct(product);
        response.status(201).json(addedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

// PATCH http://localhost:3001/api/products/7 <-- id
router.patch("/products/:productId([0-9]+)",  async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Take ID from request into the body: 
        request.body.productId = +request.params.productId;
        // Take image from request into the body: 
        request.body.image = request.files?.image;
        const product = new ProductModel(request.body);
        const updatedProduct = await productsLogic.updatePartialProduct(product);
        response.json(updatedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:3001/api/events/:productId
router.delete("/products/:productId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const productId = +request.params.productId;
        await productsLogic.deleteProduct(productId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/products/images/ <-- Display images
router.get("/products/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;

        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);

        if (!fs.existsSync(absolutePath)) {
            throw new RouteNotFoundError(request.method, request.originalUrl);
        }
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;