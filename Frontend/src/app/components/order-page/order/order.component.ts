import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/models/cart-model';
import { ItemModel } from 'src/app/models/item-model';
import { OrderModel } from 'src/app/models/order-model';
import UserModel from 'src/app/models/user-model';
import { OrdersService } from 'src/app/services/orders.service';
import moment from 'moment';
import store from 'src/app/redux-ngrx/store';
import Role from 'src/app/models/role-model';
import { ShoppingService } from 'src/app/services/shopping.service';
import { PdfReceiptComponent } from '../pdf-receipt/pdf-receipt.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  // Order Form:
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isLinear = true;

  cities = ["Tel-Aviv", "Haifa", "Jerusalem", "Beer Sheva", "Ashdod", "Ashkelon", "Rishon LeZion", "Petah Tikva", "Netanya", "Ramat Gan", "Holon"];

  public today = moment();
  minDate = new Date().toISOString().split("T")[0];

  public order = new OrderModel();

  // User:
  public user = new UserModel();
  isAdmin = false;
  isCustomer = false;

  // Shopping:
  public cartsByUser: CartModel[] = [];
  public cart: CartModel;
  public itemsByCart: ItemModel[] = [];
  public totalCartPrice = 0;

  // Search:
  searchText: any;

  constructor(private ordersService: OrdersService, private shoppingService: ShoppingService, private pdfReceipt: PdfReceiptComponent, private router: Router, private _formBuilder: FormBuilder) { }

  async ngOnInit() {
    try {
      // Order Form:
      this.firstFormGroup = this._formBuilder.group({
        cityCtrl: ['', Validators.required],
        streetCtrl: ['', Validators.required],
        deliveryDateCtrl: ['', Validators.required],
      });
      this.secondFormGroup = this._formBuilder.group({
        creditCardCtrl: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern("^[0-9]*$")]],
      });
      // Upload User:
      this.user = store.getState().authState.user;
      if (this.user) {
        // Admin / Customer:
        if (this.user.role === Role.Admin) this.isAdmin = true;
        if (this.user.role === Role.Customer) this.isCustomer = true;
        // Upload Carts:
        this.cartsByUser = await this.shoppingService.getCartsByUser(this.user.userId);
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
      if (this.itemsByCart.length === 0 || this.totalCartPrice < 99) {
        this.router.navigateByUrl('/');
      }
    }
    catch (err: any) {
      alert(err.error);
    }
  }

  public async send() {
    try {
      this.order.userId = this.user.userId;
      this.order.cartId = this.cart.cartId;
      this.order.totalPrice = this.totalCartPrice;
      this.order.orderDate = this.today.format();
      await this.ordersService.addNewOrder(this.order);
      alert("Successfully Order!");
      // Close Cart:
      this.cart.isActive = "No";
      await this.shoppingService.updateCart(this.cart);
      this.router.navigateByUrl("/pdf");
    }
    catch (err: any) {
      alert(err.error);
    }
  }

  public async getCity() {
    this.order.city = this.user.city;
  }

  public async getStreet() {
    this.order.street = this.user.street;
  }
  
}
