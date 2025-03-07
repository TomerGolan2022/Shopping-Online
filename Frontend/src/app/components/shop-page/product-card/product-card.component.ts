import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product-model';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import moment from 'moment';
import { ShoppingService } from 'src/app/services/shopping.service';
import { ItemModel } from 'src/app/models/item-model';
import UserModel from 'src/app/models/user-model';
import store from 'src/app/redux-ngrx/store';
import Role from 'src/app/models/role-model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input()
  public product: ProductModel;
  public item = new ItemModel();
  public today = moment();

  // User:
  public user = new UserModel();
  isAdmin = false;
  isCustomer = false;

  constructor(private shoppingService: ShoppingService, public dialog: MatDialog, private shoppingList: ShoppingListComponent) { }

  ngOnInit(): void {
    this.user = store.getState().authState.user;
    if (this.user) {
      // Admin / Customer:
      if (this.user.role === Role.Admin) this.isAdmin = true;
      if (this.user.role === Role.Customer) this.isCustomer = true;
    }
    this.item.amount = 1;
  }

  public async addToCart() {
    try {
      this.item.productId = this.product.productId;
      this.item.cartId = this.shoppingList.cart.cartId;
      if (this.shoppingList.itemsByCart.find(item => item.productId === this.product.productId)) {
        alert("Has been added to cart! Please change the amount.");
        this.item.amount = 1;
        // const itemToUpdate = this.shoppingList.itemsByCart.find(item => item.productId === this.product.productId);
        // this.item.itemId = itemToUpdate.itemId;
        // await this.shoppingService.updateItem(this.item);
        // this.item.amount = itemToUpdate.amount;
      } else {
        const addedItem = await this.shoppingService.addNewItem(this.item);
        alert("Product added to cart!");
        this.shoppingList.itemsByCart.push(addedItem);
        // Change Total Cart Price:
        this.shoppingList.totalCartPrice = 0;
        for (let index = 0; index < this.shoppingList.itemsByCart.length; index++) {
          this.shoppingList.totalCartPrice += this.shoppingList.itemsByCart[index].totalPrice;
        };
      }
    }
    catch (err: any) {
      alert(err.error);
    }
  }

}
