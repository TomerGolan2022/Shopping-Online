import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MaterialExampleModule } from '../material.module';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { AddProductComponent } from './components/admin-page/add-product/add-product.component';
import { ShoppingListComponent } from './components/shop-page/shopping-list/shopping-list.component';
import { MatStepperModule } from '@angular/material/stepper';
import { AppRoutingModule } from './app-routing.module';
import { ItemCardComponent } from './components/shop-page/item-card/item-card.component';
import { EditProductComponent } from './components/admin-page/edit-product/edit-product.component';
import { AdminProductCardComponent } from './components/admin-page/admin-product-card/admin-product-card.component';
import { AdminProductListComponent } from './components/admin-page/admin-product-list/admin-product-list.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { OrderComponent } from './components/order-page/order/order.component';
import { HighlighterPipe } from './highlighter.pipe';
import { PdfReceiptComponent } from './components/order-page/pdf-receipt/pdf-receipt.component';
import { ProductCardComponent } from './components/shop-page/product-card/product-card.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    ProductCardComponent,
    ShoppingListComponent,
    OrderComponent,
    HomeComponent,
    LoginComponent,
    AddProductComponent,
    RegisterComponent,
    EditProductComponent,
    ItemCardComponent,
    AdminProductCardComponent,
    AdminProductListComponent,
    HighlighterPipe,
    PdfReceiptComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatStepperModule,
    MaterialFileInputModule,
    Ng2SearchPipeModule
  ],
  providers: [ HeaderComponent, ShoppingListComponent, PdfReceiptComponent, HomeComponent, LoginComponent],
  bootstrap: [LayoutComponent],
})
export class AppModule { }
