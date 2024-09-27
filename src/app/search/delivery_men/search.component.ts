import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StateController } from '../../data/shared/stateController';
import { ResquestServer } from '../../data/shared/requestServer';
import { ModalAmountNotCompleteOrders } from '../../modal/amountNotcompleteOrders/read.component';

@Component({
  selector: 'search-delivery-man',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
})
export class ModalSearchDeliveryMen {
  activeModal = inject(NgbActiveModal);
  stateController = new StateController();
  requestServer = new ResquestServer();
  //
  result: any;
  searchText = '';
  deliveryMen: any;
  search() {
    this.stateController.isLoadingInnerSearch = true;
    this.stateController.errorInnerSearch = '';

    var data3 = {
      tag: 'search',
      inputUserPhone: this.searchText,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.deliveryMenUrl,
      (result) => {
        this.result = JSON.parse(result);
        // this.activeModal.close(result);
        this.stateController.isLoadingInnerSearch = false;

        // const successModal =
        //   this.requestServer.sharedMethod.customModal.successModal();
        // successModal.componentInstance.result = 'تم بنجاح';
      },
      (error) => {
        this.stateController.errorInnerSearch = error;
        this.stateController.isLoadingInnerSearch = false;

        // loadingModal.close();
        // const errorModal =
        //   this.requestServer.sharedMethod.customModal.errorModal();
        // errorModal.componentInstance.result = error;
      }
    );
  }
  read() {
    const loadingModal =
      this.requestServer.sharedMethod.customModal.loadingModal();
    loadingModal.componentInstance.title = 'يرجى الانتظار';
    const data3 = {
      tag: 'read',
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.deliveryMenUrl,
      (res) => {
        loadingModal.close();
        console.log(res);

        const data = JSON.parse(res);
        this.deliveryMen = data;
      },
      (e) => {
        loadingModal.close();
        const errorModal =
          this.requestServer.sharedMethod.customModal.errorModal();
        errorModal.componentInstance.result = e;
      }
    );
  }
  readAmount(item: any) {
    var orderIds = [];
    const orderDelivery = item.ordersDelivery;
    for (let index = 0; index < orderDelivery.length; index++) {
      const element = orderDelivery[index]['orderId'];
      orderIds.push(element);
    }

    console.log('orders', orderIds);

    const loadingModal =
      this.requestServer.sharedMethod.customModal.loadingModal();
    loadingModal.componentInstance.title = 'يرجى الانتظار';
    const data3 = {
      tag: 'getAmountNotcompleteOrders',
      ids: orderIds,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.deliveryMenUrl,
      (res) => {
        loadingModal.close();
        console.log(res);

        const data = JSON.parse(res);

        this.openOrdersModal({
          deliveryMan: item.name,
          orders: data,
        });
      },
      (e) => {
        loadingModal.close();
        const errorModal =
          this.requestServer.sharedMethod.customModal.errorModal();
        errorModal.componentInstance.result = e;
      }
    );
  }
  choose(result: any) {
    this.activeModal.close(result);
  }
  openOrdersModal(data: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalAmountNotCompleteOrders,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        fullscreen: false,
        scrollable: true,
      }
    );
    a.componentInstance.onOpen(data);
  }
}
