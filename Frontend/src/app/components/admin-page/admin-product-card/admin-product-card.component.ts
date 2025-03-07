import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product-model';
import UserModel from 'src/app/models/user-model';
import store from 'src/app/redux-ngrx/store';
import Role from 'src/app/models/role-model';
import { MatDialog } from '@angular/material/dialog';
import { AdminProductListComponent } from '../admin-product-list/admin-product-list.component';

@Component({
  selector: 'app-admin-product-card',
  templateUrl: './admin-product-card.component.html',
  styleUrls: ['./admin-product-card.component.css']
})
export class AdminProductCardComponent implements OnInit {

  @Input()
  public product: ProductModel;

  // User:
  public user = new UserModel();
  isAdmin = false;
  isCustomer = false;

  constructor(public dialog: MatDialog, private adminProductsList: AdminProductListComponent) { }

  ngOnInit(): void {
    this.user = store.getState().authState.user;
    if (this.user) {
      // Admin / Customer:
      if (this.user.role === Role.Admin) this.isAdmin = true;
      if (this.user.role === Role.Customer) this.isCustomer = true;
    }
  }

  public async editProduct(product: ProductModel) {
    try {
      this.adminProductsList.productToEdit = product;
    }
    catch (err: any) {
      alert(err.error);
    }
  }

  public async showEditing() {
    try {
      this.adminProductsList.showEditing = true;
    }
    catch (err: any) {
      alert(err.error);
    }
  }

}
