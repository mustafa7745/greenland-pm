import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsModal } from '../../products/read/read.component';
import { ResquestServer } from '../../data/shared/requestServer';

@Component({
  selector: 'amount-notcomplete-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './read.component.html',
})
export class ModalAmountNotCompleteOrders {
  activeModal = inject(NgbActiveModal);
  requestServer = new ResquestServer();
  //
  data: any;
  onOpen(data: any) {
    this.data = data;
  }
  getTotalSum(orders: any[]): number {
    return orders.reduce((acc, item) => acc + item.sum, 0);
  }
 
}
