import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category-model';
import { ProductModel } from 'src/app/models/product-model';
import { ProductsService } from 'src/app/services/products.service';
import { AdminProductListComponent } from '../admin-product-list/admin-product-list.component';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

    editProductForm: FormGroup;

    public categories: CategoryModel[] = [];
    @Input()
    public productToEdit = new ProductModel();

    @ViewChild("imageFile")
    public imageFileRef: ElementRef<HTMLInputElement>;
    
    constructor(private productsService: ProductsService,   private _formBuilder: FormBuilder, private adminProductsList: AdminProductListComponent) { }

    async ngOnInit() {
        this.editProductForm = this._formBuilder.group({
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

    public async update() {
        try {
            if (this.imageFileRef) {
                this.productToEdit.image = this.imageFileRef.nativeElement.files[0];
            }
            await this.productsService.updateProduct(this.productToEdit);
            alert("Product has been updated");
        }
        catch(err: any) {
            alert(err.error);
        }
    }

    public async showEditing() {
        try {
          this.adminProductsList.showEditing = !this.adminProductsList.showEditing;
        }
        catch (err: any) {
          alert(err.error);
        }
      }

}