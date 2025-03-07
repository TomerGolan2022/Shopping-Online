import Joi from "joi";

class OrderModel {
    [x: string]: any;

    public orderId: number;
    public userId: number;
    public cartId: number;
    public totalPrice: number;
    public city: string;
    public street: string;
    public deliveryDate: string;
    public orderDate: string;
    public creditCard: string;
    
    public constructor(order: OrderModel) {
        this.orderId = order.orderId;
        this.userId = order.userId;
        this.cartId = order.cartId;
        this.totalPrice = order.totalPrice;
        this.city = order.city;
        this.street = order.street;
        this.deliveryDate = order.deliveryDate;
        this.orderDate = order.orderDate;
        this.creditCard = order.creditCard;
    }

    private static postValidationSchema = Joi.object({
        orderId: Joi.forbidden(),
        userId: Joi.number().required().min(1),
        cartId: Joi.number().required().min(1),
        totalPrice: Joi.number().optional().min(2),
        city: Joi.string().required().min(2).max(20),
        street: Joi.string().required().min(2).max(30),
        deliveryDate: Joi.string().required().min(2).max(50),
        orderDate: Joi.string().required().min(2).max(50),
        creditCard: Joi.string().optional().min(16).max(16)
    });

    public validatePost(): string {
        const result = OrderModel.postValidationSchema.validate(this);
        return result.error?.message;
    }

}

export default OrderModel;