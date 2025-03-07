import { OkPacket } from "mysql";
import { v4 as uuid } from "uuid";
import dal from "../2-utils/dal"
import CategoryModel from "../4-models/category-model";
import { ResourceNotFoundError, ValidationError } from "../4-models/errors-model";
import ProductModel from "../4-models/product-model";

// Get All Categories:
async function getAllCategories(): Promise<CategoryModel[]> {
    const sql = `SELECT * FROM categories`;
    const categories = await dal.execute(sql);
    return categories;
}

// Get All Products:
async function getAllProducts(): Promise<ProductModel[]> {
    const sql = `SELECT * FROM products`;
    const products = await dal.execute(sql);
    return products;
}

// Get one Product: 
async function getOneProduct(productId: number): Promise<ProductModel> {
    const sql = `SELECT * FROM products WHERE productId=?;
                `;
    const products = await dal.execute(sql, productId);
    const product = products[0];
    if (!product) {
        throw new ResourceNotFoundError(productId);
    }
    return product;
}

// Get Products By Category:
async function getProductsByCategory(categoryId: number): Promise<ProductModel[]> {
    const sql = `SELECT * FROM products JOIN categories
                 ON products.categoryId = categories.categoryId
                 WHERE products.categoryId = ${categoryId}`;
    const products = await dal.execute(sql);
    return products;
}

// Add New Product:
async function addNewProduct(product: ProductModel): Promise<ProductModel> {
    const errors = product.validatePost();
    if (errors) {
        throw new ValidationError(errors);
    }
    if (await isNameExist(product.productName)) {
        throw new ValidationError(`The product '${product.productName}' exists`);
    }
    // Handling image:
    if (product.image) {
        // Generate unique name with original extension: 
        const dotIndex = product.image.name.lastIndexOf(".");
        const extension = product.image.name.substring(dotIndex);
        product.imageName = uuid() + extension; // a3c0807a-c034-4370-854d-55612c954d83.png / 741cb7c1-422f-4476-a456-b692b2e880b8.jpg
        // Save in disk: 
        await product.image.mv("./src/1-assets/images/" + product.imageName);
        // Don't return back image file: 
        delete product.image;
    }
    const sql = `INSERT INTO products(productName, categoryId, price, imageName)
                 VALUES(?, ?, ?, ?)`;
    const values = [product.productName, product.categoryId, product.price, product.imageName];
    const result: OkPacket = await dal.execute(sql, values);
    product.productId = result.insertId;
    return product;
}


// Update full product: 
async function updateFullProduct(product: ProductModel): Promise<ProductModel> {
    const errors = product.validatePut();
    if (errors) {
        throw new ValidationError(errors);
    }
    // Handling image: 
    if (product.image) {
        // Generate unique name with original extension: 
        const dotIndex = product.image.name.lastIndexOf(".");
        const extension = product.image.name.substring(dotIndex);
        product.imageName = uuid() + extension; // a3c0807a-c034-4370-854d-55612c954d83.png / 741cb7c1-422f-4476-a456-b692b2e880b8.jpg
        // Save in disk: 
        await product.image.mv("./src/1-assets/images/" + product.imageName);
        // Don't return back image file: 
        delete product.image;
    }
    const sql = `UPDATE products SET 
                 productName = ?,
                 categoryId = ?,
                 price = ?,
                 imageName = ?
                 WHERE productId = ?`;
    const values = [product.productName, product.categoryId, product.price, product.imageName, product.productId]
    const result: OkPacket = await dal.execute(sql, values);

    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(product.productId);
    }
    // return updated product:
    const updatedProduct = await getOneProduct(product.productId);
    return updatedProduct;
}

// Update partial product: 
async function updatePartialProduct(product: ProductModel): Promise<ProductModel> {
    const errors = product.validatePatch();
    if (errors) {
        throw new ValidationError(errors);
    }
    const dbProduct = await getOneProduct(product.productId);
    for (const prop in dbProduct) {
        // Save the props if we send new props (apart from image):
        if (product[prop] !== undefined) {
            dbProduct[prop] = product[prop];
        }
        // Save the image if we send new image:
        if (product.image !== undefined) {
            dbProduct.image = product.image;
        }
    }
    const updatedProduct = await updateFullProduct(new ProductModel(dbProduct));
    return updatedProduct;
}

// Delete Product:
async function deleteProduct(productId: number): Promise<void> {
    const sql = `DELETE FROM products WHERE productId = ?`;
    const result = await dal.execute(sql, productId);
    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(productId);
    }
}

// Validation:
async function isNameExist(productName: string): Promise<boolean> {
    const sql = `SELECT EXISTS(SELECT * FROM products WHERE productName = ?) as isExists`;
    const values = [productName];
    const result = await dal.execute(sql, values);
    const isExists = result[0].isExists;
    return isExists === 1;
}

export default {
    getAllCategories,
    getAllProducts,
    getOneProduct,
    getProductsByCategory,
    addNewProduct,
    updateFullProduct,
    updatePartialProduct,
    deleteProduct
};

