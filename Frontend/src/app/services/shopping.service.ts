import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartModel } from '../models/cart-model';
import { ItemModel } from '../models/item-model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private http: HttpClient) { }

  // Get All Carts:
  public async getAllCarts(): Promise<CartModel[]> {
    const observable = this.http.get<CartModel[]>(environment.cartsUrl);
    const carts = await firstValueFrom(observable);
    return carts;
  }

    // Get one cart by cartId: 
    public async getOneCart(cartId: number): Promise<CartModel> {
      const carts = await this.getAllCarts();
      const cart = carts.find(c => c.cartId === cartId);
      return cart;
  }
  

  // Get All Items:
  public async getAllItems(): Promise<ItemModel[]> {
    const observable = this.http.get<ItemModel[]>(environment.itemsUrl);
    const items = await firstValueFrom(observable);
    return items;
  }

  // Get Carts By User: 
  public async getCartsByUser(userId: number): Promise<CartModel[]> {
    const allCarts = await this.getAllCarts();
    const cartsByUser = allCarts.filter(cart => cart.userId === userId);
    return cartsByUser;
  }

  // Get Items By cart:
  public async getItemsByCart(cartId: number): Promise<ItemModel[]> {
    const observable = this.http.get<ItemModel[]>(environment.itemsByCartUrl + cartId);
    const items = await firstValueFrom(observable);
    return items;
  }

  // Add New Cart:
  public async addNewCart(cart: CartModel): Promise<CartModel> {
    // const formData = new FormData();
    // formData.append("userId", cart.userId.toString());
    // formData.append("startDate", cart.startDate);
    const observable = this.http.post<CartModel>(environment.cartsUrl, cart)
    const addedCart = await firstValueFrom(observable);
    return addedCart;
  }

  // Update Cart:
  public async updateCart(cart: CartModel): Promise<CartModel> {
    // const formData = new FormData();
    // formData.append("isActive", cart.isActive);
    const observable = this.http.patch<CartModel>(environment.cartsUrl + cart.cartId, cart)
    const updatedCart = await firstValueFrom(observable);
    return updatedCart;
  }

  // Add New Item:
  public async addNewItem(item: ItemModel): Promise<ItemModel> {
    // const formData = new FormData();
    // formData.append("productId", item.productId.toString());
    // formData.append("amount", item.amount.toString());
    // formData.append("cartId", item.cartId.toString());
    const observable = this.http.post<ItemModel>(environment.itemsUrl, item)
    const addedItem = await firstValueFrom(observable);
    return addedItem;
  }

  // Update Item:
  public async updateItem(item: ItemModel): Promise<ItemModel> {
    const formData = new FormData();
    formData.append("amount", item.amount.toString());
    const observable = this.http.patch<ItemModel>(environment.itemsUrl + item.itemId, formData)
    const updatedItem = await firstValueFrom(observable);
    return updatedItem;
  }

  // Clear Cart:
  public async clearCart(cartId: number): Promise<void> {
    const observable = this.http.delete(environment.cartsUrl + cartId);
    await firstValueFrom(observable);
  }

  // Delete Item:
  public async deleteItem(itemId: number): Promise<void> {
    const observable = this.http.delete(environment.itemsUrl + itemId);
    await firstValueFrom(observable);
  }
}
