import Joi from "joi";

class ItemModel {
    [x: string]: any;

    public itemId: number;
    public productId: number;
    public amount: number;
    public totalPrice: number;
    public cartId: number;

    public constructor(cart: ItemModel) {
        this.itemId = cart.itemId;
        this.productId = cart.productId;
        this.amount = cart.amount;
        this.totalPrice = cart.totalPrice;
        this.cartId = cart.cartId;
    }

    private static postValidationSchema = Joi.object({
        itemId: Joi.forbidden(),
        productId: Joi.number().required().min(1),
        amount: Joi.number().required().min(1).max(20),
        totalPrice: Joi.number().optional().min(2),
        cartId: Joi.number().required().min(1),
    });

    private static putValidationSchema = Joi.object({
        itemId: Joi.number().required().integer().min(1),
        productId: Joi.number().required().min(1),
        amount: Joi.number().required().min(1).max(20),
        totalPrice: Joi.number().optional().min(2),
        cartId: Joi.number().required().min(1),
    });

    private static patchValidationSchema = Joi.object({
        itemId: Joi.number().optional().integer().min(1),
        productId: Joi.number().optional().min(1),
        amount: Joi.number().optional().min(1).max(20),
        totalPrice: Joi.number().optional().min(2),
        cartId: Joi.number().optional().min(1),
    });

    public validatePost(): string {
        const result = ItemModel.postValidationSchema.validate(this);
        return result.error?.message;
    }

    public validatePut(): string {
        const result = ItemModel.putValidationSchema.validate(this);
        return result.error?.message;
    }

    public validatePatch(): string {
        const result = ItemModel.patchValidationSchema.validate(this);
        return result.error?.message;
    }

}

export default ItemModel;