import { CategoryModel } from "./category-model";

export class ProductModel {
    public productId: number;
    public productName: string;
    public categoryId: number;
    public price: number;
    public image: File;
    public imageName: string;
}
