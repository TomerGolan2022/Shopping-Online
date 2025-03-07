import Joi from "joi";
import Role from "./role-model";

class UserModel {
    [x: string]: any;

    public userId: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public identifyNumber: number;
    public password: string;
    public city: string;
    public street: string;
    public role: Role;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.identifyNumber = user.identifyNumber;
        this.password = user.password;
        this.city = user.city;
        this.street = user.street;
        this.role = user.role;
    }

    private static postValidationSchema = Joi.object({
        userId: Joi.forbidden(),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        username: Joi.string().required().min(2).max(50),
        identifyNumber: Joi.string().required().min(9).max(9),
        password: Joi.string().required().min(2).max(50),
        city: Joi.string().required().min(2).max(20),
        street: Joi.string().required().min(2).max(30),
        role: Joi.string().optional().min(2).max(50)
    });

    private static putValidationSchema = Joi.object({
        userId: Joi.number().required().integer().min(1),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        username: Joi.string().required().min(2).max(50),
        identifyNumber: Joi.string().required().min(9).max(9),
        password: Joi.string().required().min(2).max(50),
        city: Joi.string().required().min(2).max(20),
        street: Joi.string().required().min(2).max(30),
        role: Joi.string().optional().min(2).max(50)
    });

    private static patchValidationSchema = Joi.object({
        userId: Joi.number().required().integer().min(1),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        username: Joi.string().required().min(2).max(50),
        identifyNumber: Joi.string().required().min(9).max(9),
        password: Joi.string().required().min(2).max(50),
        city: Joi.string().required().min(2).max(20),
        street: Joi.string().required().min(2).max(30),
        role: Joi.string().optional().min(2).max(50)
    });

    public validatePost(): string {
        const result = UserModel.postValidationSchema.validate(this);
        return result.error?.message;
    }

    public validatePut(): string {
        const result = UserModel.putValidationSchema.validate(this);
        return result.error?.message;
    }

    public validatePatch(): string {
        const result = UserModel.patchValidationSchema.validate(this);
        return result.error?.message;
    }

}

export default UserModel;