import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel } from 'src/app/models/category-model';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  // Get All Categories:
  public async getAllCategories(): Promise<CategoryModel[]> {
    const observable = this.http.get<CategoryModel[]>(environment.categoriesUrl);
    const categories = await firstValueFrom(observable);
    return categories;
  }

  // Get All Products:
  public async getAllProducts(): Promise<ProductModel[]> {
    const observable = this.http.get<ProductModel[]>(environment.productsUrl);
    const products = await firstValueFrom(observable);
    return products;
  }

  // Get one product by productId: 
  public async getOneProduct(productId: number): Promise<ProductModel> {
    const products = await this.getAllProducts();
    const product = products.find(p => p.productId === productId);
    return product;
}

  // Get Products By Category:
  public async getProductsByCategory(categoryId: number): Promise<ProductModel[]> {
    const observable = this.http.get<ProductModel[]>(environment.productsByCategoryUrl + categoryId);
    const products = await firstValueFrom(observable);
    return products;
  }

  // Add New Product:
  public async addNewProduct(product: ProductModel): Promise<void> {
    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("price", product.price.toString());
    formData.append("categoryId", product.categoryId.toString());
    formData.append("image", product.image);
    const observable = this.http.post<ProductModel>(environment.productsUrl, formData)
    const addedProduct = await firstValueFrom(observable);
  }

  // Update Product:
  public async updateProduct(product: ProductModel): Promise<void> {
    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("price", product.price.toString());
    formData.append("categoryId", product.categoryId.toString());
    formData.append("image", product.image);
    const observable = this.http.patch<ProductModel>(environment.productsUrl + product.productId, formData)
    const updatedVacation = await firstValueFrom(observable);
  }

  // Delete Product:
  public async deleteProduct(productId: number): Promise<void> {
    const observable = this.http.delete(environment.productsUrl + productId);
    await firstValueFrom(observable);
  }
}
