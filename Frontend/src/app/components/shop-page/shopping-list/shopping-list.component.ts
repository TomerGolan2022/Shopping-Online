import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category-model';
import { ProductModel } from 'src/app/models/product-model';
import UserModel from 'src/app/models/user-model';
import Role from 'src/app/models/role-model';
import { ProductsService } from 'src/app/services/products.service';
import store from 'src/app/redux-ngrx/store';
import { CartModel } from 'src/app/models/cart-model';
import { ShoppingService } from 'src/app/services/shopping.service';
import { ItemModel } from 'src/app/models/item-model';
import moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  // User:
  public user = new UserModel();
  isAdmin = false;
  isCustomer = false;

  // Products:
  public allProducts: ProductModel[] = [];
  public categories: CategoryModel[] = [];
  public productsByCategory: ProductModel[] = [];
  public productToEdit: ProductModel;

  // Shopping:
  public cartsByUser: CartModel[] = [];
  public cart: CartModel;
  public newCart = new CartModel();
  public itemsByCart: ItemModel[] = [];
  public totalCartPrice = 0;

  public today = moment();

  // Search:
  searchText: string;

  constructor(private router: Router, private productsService: ProductsService, private shoppingService: ShoppingService) { }

  async ngOnInit() {
    try {
      // Upload Categories:
      this.categories = await this.productsService.getAllCategories();
      // Upload Products:
      this.allProducts = await this.productsService.getAllProducts();
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
        else {
          // Create New Cart:
          this.newCart.userId = this.user.userId;
          this.newCart.startDate = this.today.format();
          const addedCart = await this.shoppingService.addNewCart(this.newCart);
          this.cart = addedCart;
          this.itemsByCart = await this.shoppingService.getItemsByCart(this.cart.cartId);
        }
      }
    }
    catch (err: any) {
      alert(err.error);
    }
  }

  public async clearCart() {
    try {
      const ok = window.confirm("Are you sure to clear?");
      if (!ok) return;
      await this.shoppingService.clearCart(this.cart.cartId);
      alert("Cart has been successfully cleared");
      this.itemsByCart = [];
    }
    catch (err: any) {
      alert(err.error);
    }
  }

}
