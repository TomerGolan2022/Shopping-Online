import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home-area/home/home.component';
import { ShoppingListComponent } from './components/shop-page/shopping-list/shopping-list.component';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { AdminProductListComponent } from './components/admin-page/admin-product-list/admin-product-list.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { OrderComponent } from './components/order-page/order/order.component';
import { PdfReceiptComponent } from './components/order-page/pdf-receipt/pdf-receipt.component';

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "shop", component: ShoppingListComponent, canActivate: [AuthGuard] },
    { path: "admin", component: AdminProductListComponent, canActivate: [AuthAdminGuard] },
    { path: "register", component: RegisterComponent },
    { path: "order", component: OrderComponent, canActivate: [AuthGuard] },
    { path: "pdf", component: PdfReceiptComponent, canActivate: [AuthGuard] },
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "**", redirectTo: "home" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard, AuthAdminGuard]
})
export class AppRoutingModule { }
