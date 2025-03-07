import { Component, Input, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/models/item-model';
import { ShoppingService } from 'src/app/services/shopping.service';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  @Input()
  public item: ItemModel;

  constructor(private shoppingService: ShoppingService, private shoppingList: ShoppingListComponent) { }

  ngOnInit(): void {
  }

  public async updateItem() {
    try {
      const updatedItem = await this.shoppingService.updateItem(this.item);
      this.item.totalPrice = updatedItem.totalPrice;
      // Change Total Cart Price:
      this.shoppingList.totalCartPrice = 0;
      for (let index = 0; index < this.shoppingList.itemsByCart.length; index++) {
        this.shoppingList.totalCartPrice += this.shoppingList.itemsByCart[index].totalPrice;
      };
    }
    catch (err: any) {
      alert(err.error);
    }
  }

  public async deleteItem() {
    try {
      const ok = window.confirm("Are you sure to delete?");
      if (!ok) return;
      await this.shoppingService.deleteItem(this.item.itemId);
      alert("Item has been successfully deleted");
      const indexToDelete = this.shoppingList.itemsByCart.findIndex(item => item.itemId === this.item.itemId);
      this.shoppingList.itemsByCart.splice(indexToDelete, 1);
      // Change Total Cart Price:
      this.shoppingList.totalCartPrice = 0;
      for (let index = 0; index < this.shoppingList.itemsByCart.length; index++) {
        this.shoppingList.totalCartPrice += this.shoppingList.itemsByCart[index].totalPrice;
      };
    }
    catch (err: any) {
      alert(err.error);
    }
  }

}
