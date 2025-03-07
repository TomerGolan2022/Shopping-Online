import Joi from "joi";

class CartModel {
    [x: string]: any;

    public cartId: number;
    public userId: number;
    public startDate: string;
    public isActive: string;

    public constructor(cart: CartModel) {
        this.cartId = cart.cartId;
        this.userId = cart.userId;
        this.startDate = cart.startDate;
        this.isActive = cart.isActive;
    }

    private static postValidationSchema = Joi.object({
        cartId: Joi.forbidden(),
        userId: Joi.number().required().min(1),
        startDate: Joi.string().required().min(2).max(50),
        isActive: Joi.string().optional().min(2).max(50)
    });

    private static putValidationSchema = Joi.object({
        cartId: Joi.number().required().integer().min(1),
        userId: Joi.number().required().min(1),
        startDate: Joi.string().required().min(2).max(50),
        isActive: Joi.string().optional().min(2).max(50)
    });

    private static patchValidationSchema = Joi.object({
        cartId: Joi.number().optional().integer().min(1),
        userId: Joi.number().optional().min(1),
        startDate: Joi.string().optional().min(2).max(50),
        isActive: Joi.string().optional().min(2).max(50)
    });

    public validatePost(): string {
        const result = CartModel.postValidationSchema.validate(this);
        return result.error?.message;
    }

    public validatePut(): string {
        const result = CartModel.putValidationSchema.validate(this);
        return result.error?.message;
    }

    public validatePatch(): string {
        const result = CartModel.patchValidationSchema.validate(this);
        return result.error?.message;
    }

}

export default CartModel;