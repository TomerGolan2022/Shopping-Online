import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category-model';
import { ProductModel } from 'src/app/models/product-model';
import { ProductsService } from 'src/app/services/products.service';
import { AdminProductListComponent } from '../admin-product-list/admin-product-list.component';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

    addProductForm: FormGroup;

    public categories: CategoryModel[] = [];
    public product = new ProductModel();

    @ViewChild("imageFile")
    public imageFileRef: ElementRef<HTMLInputElement>;
    
    constructor(private productsService: ProductsService,  private _formBuilder: FormBuilder, private adminProductsList: AdminProductListComponent) { }

    async ngOnInit() {
        this.addProductForm = this._formBuilder.group({
            categoryIdCtrl: ['', [Validators.required]],
            productNameCtrl: ['', [Validators.required]],
            priceCtrl: ['', [Validators.required]],
            // imageCtrl: ['', [Validators.required]],
          });
        try {
            this.categories = await this.productsService.getAllCategories();
        }
        catch(err: any) {
            alert(err.error);
        }
    }

    public async send() {
        try {
            this.product.image = this.imageFileRef.nativeElement.files[0];
            await this.productsService.addNewProduct(this.product);
            alert("Product has been added");
        }
        catch(err: any) {
            alert(err.error);
        }
    }

    public async showAddition() {
        try {
          this.adminProductsList.showAddition = !this.adminProductsList.showAddition;
        }
        catch (err: any) {
          alert(err.error);
        }
      }
    

}