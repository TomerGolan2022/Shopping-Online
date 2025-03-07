import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrderModel } from 'src/app/models/order-model';
import { CartModel } from 'src/app/models/cart-model';
import { ItemModel } from 'src/app/models/item-model';
import { ShoppingService } from 'src/app/services/shopping.service';
import { jsPDF } from 'jspdf';
import { OrdersService } from 'src/app/services/orders.service';
import UserModel from 'src/app/models/user-model';
import store from 'src/app/redux-ngrx/store';
import Role from 'src/app/models/role-model';


import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pdf-receipt',
  templateUrl: './pdf-receipt.component.html',
  styleUrls: ['./pdf-receipt.component.css']
})
export class PdfReceiptComponent implements OnInit {

  // User:
  public user = new UserModel();
  isAdmin = false;
  isCustomer = false;

  public cartsByUser: CartModel[];
  public ordersByUser: OrderModel[];
  public lastOrder: OrderModel;

  public cartByOrder = new CartModel();
  public itemsByCart: ItemModel[] = [];

  constructor(private router: Router, private dialog: MatDialog, private ordersService: OrdersService, private shoppingService: ShoppingService) { }

  async ngOnInit() {
    this.user = store.getState().authState.user;
    if (this.user) {
      // Admin / Customer:
      if (this.user.role === Role.Admin) this.isAdmin = true;
      if (this.user.role === Role.Customer) this.isCustomer = true;
      // Upload Carts:
      this.cartsByUser = await this.shoppingService.getCartsByUser(this.user.userId);
      // Upload Orders:
      this.ordersByUser = await this.ordersService.getOrdersByUser(this.user.userId);

      if (this.cartsByUser.find(cart => cart.isActive === "Yes")) {
        this.router.navigateByUrl('/');
      }

       // Find Last Order:
      const lastOrderIndex = this.ordersByUser.length - 1;
      if (this.ordersByUser) {
        this.lastOrder = this.ordersByUser[lastOrderIndex];
      }
      if (this.lastOrder) {
        // Upload Cart By Order:
        this.cartByOrder = await this.shoppingService.getOneCart(this.lastOrder.cartId);
        // Upload Items By Cart:
        this.itemsByCart = await this.shoppingService.getItemsByCart(this.cartByOrder.cartId);
      }
    }
  }

  public ExportPDF() {
    var data = document.getElementById('contentToExport');
    var width = document.getElementById('contentToExport').offsetWidth;
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4');
      var position = 5;
      pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth-7, imgHeight)
      pdf.save('my_order.pdf');
    });
  }

}



