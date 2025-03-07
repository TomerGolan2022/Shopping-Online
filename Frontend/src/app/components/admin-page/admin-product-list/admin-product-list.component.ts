import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category-model';
import { ProductModel } from 'src/app/models/product-model';
import UserModel from 'src/app/models/user-model';
import Role from 'src/app/models/role-model';
import { ProductsService } from 'src/app/services/products.service';
import store from 'src/app/redux-ngrx/store';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit {

  // User:
  public user = new UserModel();
  isAdmin = false;

  // Products:
  public allProducts: ProductModel[] = [];
  public categories: CategoryModel[] = [];
  public productsByCategory: ProductModel[] = [];
  public productToEdit: ProductModel;

  // Search:
  searchText: any;

  // Admin:
  showAddition = false;
  showEditing = false;

  constructor(private productsService: ProductsService) { }

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
      }
    }
    catch (err: any) {
      alert(err.error);
    }
  }

}
