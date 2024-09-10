import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductController } from '../products_contoller/c_p_controller';
import { ResquestServer } from '../data/shared/requestServer';

@Component({
  selector: 'show-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './read.component.html',
})
export class ModalShowOrder {
  requestServer = new ResquestServer();
  activeModal = inject(NgbActiveModal);
  product_controller = new ProductController();
  constructor() {}

  // Fields
  newName = '';
  isDisabledSaveButton() {
    return !(this.newName.length > 0);
  }

  getProduct(id: string) {
    return this.product_controller.getProductById(id);
  }
  getFinalPrice() {
    var sum = 0;
    // console.log(this.data.currency.currency_price);

    this.data.inputOrderProjectsIdsWithQnt.forEach((e: any) => {
      // console.log(this.getProduct(e.id).product_price);
      sum = sum + this.getProduct(e.id).postPrice * e.qnt;
    });
    return sum;
  }

  data: any;
  user_id: any;
  // //
  onOpen(data: string) {
    console.log(data);

    this.data = data;
  }
  add() {
    var data3;
    if ((this.data.tag == 'add')) {
      data3 = {
        tag: 'add',
        inputUserId: this.data.user.id,
        inputOrderProductsIdsWithQnt: this.data.inputOrderProjectsIdsWithQnt,
        inputUserLocationId: this.data.userLocation.id,
        inputDeliveryManId: this.data.deliveryMan.id,
        inputOrderDeliveryPrice: this.data.price,
        inputOrderDeliveryActualPrice: this.data.actualPrice,
      };
    } else {
      data3 = {
        tag: 'addWithoutDelivery',
        inputUserId: this.data.user.id,
        inputOrderProductsIdsWithQnt: this.data.inputOrderProjectsIdsWithQnt,
      };
    }

    console.log(data3);

    const loadingModal =
      this.requestServer.sharedMethod.customModal.loadingModal();
    loadingModal.componentInstance.title = ' يرجى الانتظار';

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.ordersUrl,
      (res) => {
        console.log('done ');

        loadingModal.close();
      },
      (e) => {
        loadingModal.close();
        const errorModal =
          this.requestServer.sharedMethod.customModal.errorModal();
        errorModal.componentInstance.result = e;
      }
    );
  }
}
