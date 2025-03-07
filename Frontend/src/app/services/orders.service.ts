import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderModel } from '../models/order-model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  // Get All Orders:
  public async getAllOrders(): Promise<OrderModel[]> {
    const observable = this.http.get<OrderModel[]>(environment.ordersUrl);
    const orders = await firstValueFrom(observable);
    return orders;
  }

   // Get Orders By User:
   public async getOrdersByUser(userId: number): Promise<OrderModel[]> {
    const observable = this.http.get<OrderModel[]>(environment.ordersByUserUrl + userId);
    const orders = await firstValueFrom(observable);
    return orders;
  }

  // Add New Order:
  public async addNewOrder(order: OrderModel): Promise<OrderModel> {
    // const formData = new FormData();
    // formData.append("userId", cart.userId.toString());
    // formData.append("startDate", cart.startDate);
    const observable = this.http.post<OrderModel>(environment.ordersUrl, order)
    const addedOrder = await firstValueFrom(observable);
    return addedOrder;
  }

}
