import { OkPacket } from "mysql";
import { v4 as uuid } from "uuid";
import dal from "../2-utils/dal"
import CartModel from "../4-models/cart-model";
import { ResourceNotFoundError, ValidationError } from "../4-models/errors-model";
import ItemModel from "../4-models/item-model";
import productsLogic from "./products-logic";

// Get All Carts:
async function getAllCarts(): Promise<CartModel[]> {
    const sql = `SELECT * FROM carts`;
    const carts = await dal.execute(sql);
    return carts;
}

// Get One Cart:
async function getOneCart(cartId: number): Promise<CartModel> {
    const sql = `SELECT * FROM carts WHERE cartId=? 
                   `;
    const carts = await dal.execute(sql, cartId);
    const cart = carts[0];
    if (!cart) {
        throw new ResourceNotFoundError(cartId);
    }
    return cart;
}

// Get All Items:
async function getAllItems(): Promise<ItemModel[]> {
    const sql = `SELECT * FROM items 
                 LEFT JOIN products
                 ON items.productId=products.productId`;
    const items = await dal.execute(sql);
    return items;
}

// Get One Item:
async function getOneItem(itemId: number): Promise<ItemModel> {
    const sql = `SELECT * FROM items
                 LEFT JOIN products
                 ON items.productId=products.productId
                 WHERE itemId=? 
                   `;
    const items = await dal.execute(sql, itemId);
    const item = items[0];
    if (!item) {
        throw new ResourceNotFoundError(itemId);
    }
    return item;
}

// Get Carts By User: 
async function getCartsByUser(userId: number): Promise<CartModel[]> {
    const sql = `SELECT * FROM carts WHERE userId=?;
                `;
    const carts = await dal.execute(sql, userId);
    return carts;
}

// Get Items By Cart:
async function getItemsByCart(cartId: number): Promise<ItemModel[]> {
    const sql = `SELECT * FROM items
                 LEFT JOIN products
                 ON items.productId=products.productId
                 WHERE items.cartId = ${cartId}`;
    const items = await dal.execute(sql);
    return items;
}

// Add New Cart:
async function addNewCart(cart: CartModel): Promise<CartModel> {
    const errors = cart.validatePost();
    if (errors) {
        throw new ValidationError(errors);
    }
    cart.isActive = "Yes";
    const sql = `INSERT INTO carts(userId, startDate, isActive)
                 VALUES(?, ?, ?)`;
    const values = [cart.userId, cart.startDate, cart.isActive];
    const result: OkPacket = await dal.execute(sql, values);
    cart.cartId = result.insertId;
    return cart;
}

// Update full Cart: 
async function updateFullCart(cart: CartModel): Promise<CartModel> {
    // cart.isActive = "No";
    const errors = cart.validatePut();
    if (errors) {
        throw new ValidationError(errors);
    }
    const sql = `UPDATE carts SET 
                 userId = ?,
                 startDate = ?,
                 isActive = ?
                 WHERE cartId = ?`;
    const values = [cart.userId, cart.startDate, cart.isActive, cart.cartId]
    const result: OkPacket = await dal.execute(sql, values);
    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(cart.cartId);
    }
    // return updated Cart:
    const updatedCart = getOneCart(cart.cartId);;
    return updatedCart;
}

// Update partial Cart: 
async function updatePartialCart(cart: CartModel): Promise<CartModel> {
    const errors = cart.validatePatch();
    if (errors) {
        throw new ValidationError(errors);
    }
    const dbCart = await getOneCart(cart.cartId);
    for (const prop in dbCart) {
        // Save the props if we send new props:
        if (cart[prop] !== undefined) {
            dbCart[prop] = cart[prop];
        }
    }
    const updatedCart = await updateFullCart(new CartModel(dbCart));
    return updatedCart;
}

// Add New Item:
async function addNewItem(item: ItemModel): Promise<ItemModel> {
    // The product for shopping cart
    const product = await productsLogic.getOneProduct(item.productId);
    // Sum price
    const totalPrice = (item.amount) * (product.price);
    // Change total price
    item.totalPrice = totalPrice;
    const errors = item.validatePost();
    if (errors) {
        throw new ValidationError(errors);
    }
    const sql = `INSERT INTO items(productId, amount, totalPrice, cartId)
                 VALUES(?, ?, ?, ?)`;
    const values = [item.productId, item.amount, item.totalPrice, item.cartId];
    const result: OkPacket = await dal.execute(sql, values);
    item.itemId = result.insertId;
    // return full item
    const addedItem = getOneItem(item.itemId);
    return addedItem;
}

// Update full item: 
async function updateFullItem(item: ItemModel): Promise<ItemModel> {
    // The product for shopping cart
    const product = await productsLogic.getOneProduct(item.productId);
    // Sum price
    const totalPrice = (item.amount) * (product.price);
    // Change total price
    item.totalPrice = totalPrice;
    const errors = item.validatePut();
    if (errors) {
        throw new ValidationError(errors);
    }
    const sql = `UPDATE items SET 
                 productId = ?,
                 amount = ?,
                 totalPrice = ?,
                 cartId = ?
                 WHERE itemId = ?`;
    const values = [item.productId, item.amount, item.totalPrice, item.cartId, item.itemId]
    const result: OkPacket = await dal.execute(sql, values);
    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(item.itemId);
    }
    // return updated item:
    const updatedItem = getOneItem(item.itemId);;
    return updatedItem;
}

// Update partial item: 
async function updatePartialItem(item: ItemModel): Promise<ItemModel> {
    const errors = item.validatePatch();
    if (errors) {
        throw new ValidationError(errors);
    }
    const dbItem = await getOneItem(item.itemId);
    for (const prop in dbItem) {
        // Save the props if we send new props:
        if (item[prop] !== undefined) {
            dbItem[prop] = item[prop];
        }
    }
    const updatedItem = await updateFullItem(new ItemModel(dbItem));
    return updatedItem;
}

// Clear Cart:
async function clearCart(cartId: number): Promise<void> {
    const sql = `DELETE FROM items WHERE cartId = ?`;
    const result = await dal.execute(sql, cartId);
    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(cartId);
    }
}

// Delete Item:
async function deleteItem(itemId: number): Promise<void> {
    const sql = `DELETE FROM items WHERE itemId = ?`;
    const result = await dal.execute(sql, itemId);
    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(itemId);
    }
}

export default {
    getAllCarts,
    getOneCart,
    getAllItems,
    getCartsByUser,
    getItemsByCart,
    addNewCart,
    updatePartialCart,
    addNewItem,
    updatePartialItem,
    clearCart,
    deleteItem
};

