import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/models/cart-model';
import { ItemModel } from 'src/app/models/item-model';
import { OrderModel } from 'src/app/models/order-model';
import { ProductModel } from 'src/app/models/product-model';
import Role from 'src/app/models/role-model';
import UserModel from 'src/app/models/user-model';
import store from 'src/app/redux-ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingService } from 'src/app/services/shopping.service';
import { LoginComponent } from '../../auth-area/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // User:
  public user = new UserModel();
  isAdmin = false;
  isCustomer = false;

  // Products:
  public allProducts: ProductModel[] = [];

  // Orders:
  public allOrders: OrderModel[] = [];
  public ordersByUser: OrderModel[];
  public lastOrder: OrderModel;

  // Carts:
  public cartsByUser: CartModel[] = [];
  public cart: CartModel;
  public itemsByCart: ItemModel[];
  public totalCartPrice = 0;

  constructor(public dialog: MatDialog, private productsService: ProductsService, private shoppingService: ShoppingService, private ordersService: OrdersService, private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    try {
      // Upload Products:
      this.allProducts = await this.productsService.getAllProducts();
      // Upload Orders:
      this.allOrders = await this.ordersService.getAllOrders();
      // Upload User:
      this.user = store.getState().authState.user;
      if (this.user) {
        // Admin / Customer:
        if (this.user.role === Role.Admin) this.isAdmin = true;
        if (this.user.role === Role.Customer) this.isCustomer = true;
        if (this.isCustomer) {
          // Upload Carts:
          this.cartsByUser = await this.shoppingService.getCartsByUser(this.user.userId);
          if (this.cartsByUser) {
            // Find Active Cart:
            const cartIsActive = this.cartsByUser.find(cart => cart.isActive === "Yes");
            if (cartIsActive) {
              this.cart = cartIsActive;
              this.itemsByCart = await this.shoppingService.getItemsByCart(this.cart.cartId);
              for (let index = 0; index < this.itemsByCart.length; index++) {
                this.totalCartPrice += this.itemsByCart[index].totalPrice;
              };
            }
          }
          // Upload Orders:
          this.ordersByUser = await this.ordersService.getOrdersByUser(this.user.userId);
          if (this.ordersByUser.length > 0) {
            // Find Last Order:
            const lastOrderIndex = this.ordersByUser.length - 1;
            this.lastOrder = this.ordersByUser[lastOrderIndex];
          }
        }
      }
    }
    catch (err: any) {
      alert(err.error);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent);
  }

}
