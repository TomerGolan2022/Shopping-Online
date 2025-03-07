import { OkPacket } from "mysql";
import dal from "../2-utils/dal"
import { ResourceNotFoundError, ValidationError } from "../4-models/errors-model";
import OrderModel from "../4-models/order-model";

// Get All Orders:
async function getAllOrders(): Promise<OrderModel[]> {
    const sql = `SELECT * FROM orders`;
    const orders = await dal.execute(sql);
    return orders;
}

// Get One Order:
async function getOneOrder(orderId: number): Promise<OrderModel> {
    const sql = `SELECT * FROM orders WHERE orderId=? 
                   `;
    const orders = await dal.execute(sql, orderId);
    const order = orders[0];
    if (!order) {
        throw new ResourceNotFoundError(orderId);
    }
    return order;
}

// Get Orders By User:
async function getOrdersByUser(userId:number): Promise<OrderModel[]> {
    const sql = `SELECT * FROM orders WHERE userId=?`;
    const orders = await dal.execute(sql, userId);
    return orders;
}

// For Validation:
async function getOrdersByDeliveryDate(deliveryDate: string): Promise<OrderModel[]> {
    const sql = `SELECT * FROM orders WHERE deliveryDate = ?`;
    const orders = await dal.execute(sql, deliveryDate);
    return orders
}

// Add New Order:
async function addNewOrder(order: OrderModel): Promise<OrderModel> {
    const ordersByDeliveryDate = await getOrdersByDeliveryDate(order.deliveryDate);
    const errors = order.validatePost();
    if (errors) {
        throw new ValidationError(errors);
    }
    if (ordersByDeliveryDate.length >=3) {
        throw new ValidationError(`The Delivery Date '${order.deliveryDate}' Exists`);
    }
    const dotIndex = order.creditCard.lastIndexOf("", 12);
    const last4numbers = order.creditCard.substring(dotIndex);
    order.creditCard = "************" + last4numbers;
    const sql = `INSERT INTO orders(userId, cartId, totalPrice, city, street, deliveryDate, orderDate, creditCard)
                 VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [order.userId, order.cartId, order.totalPrice, order.city, order.street, order.deliveryDate, order.orderDate, order.creditCard];
    const result: OkPacket = await dal.execute(sql, values);
    order.orderId = result.insertId;
    // return full order
    const addedOrder = getOneOrder(order.orderId);
    return addedOrder;
}

export default {
    getAllOrders,
    getOrdersByUser,
    addNewOrder
};

