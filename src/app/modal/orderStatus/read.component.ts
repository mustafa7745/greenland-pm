import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StateController } from '../../data/shared/stateController';
import { ResquestServer } from '../../data/shared/requestServer';

@Component({
  selector: 'order-status',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './read.component.html',
})
export class ModalReadOrderStatus {
  activeModal = inject(NgbActiveModal);
  stateController = new StateController();
  requestServer = new ResquestServer();
  //
  data: any;
  onOpen(data: any) {
    this.data = data;
  }
  result: any;
  searchText = '';
  deliveryMen: any;
  read() {
    const loadingModal =
      this.requestServer.sharedMethod.customModal.loadingModal();
    loadingModal.componentInstance.title = '  يرجى الانتظار ';
    //
    this.stateController.isLoadingInnerSearch = true;
    this.stateController.errorInnerSearch = '';

    var data3 = {
      tag: 'readOrderStatus',
      inputOrderId: this.data.id,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.ordersUrl,
      (result) => {
        loadingModal.close();
        this.result = JSON.parse(result);
        this.stateController.isLoadingInnerSearch = false;

        // const successModal =
        //   this.requestServer.sharedMethod.customModal.successModal();
        // successModal.componentInstance.result = 'تم بنجاح';
      },
      (error) => {
        loadingModal.close();

        loadingModal.close();
        const errorModal =
          this.requestServer.sharedMethod.customModal.errorModal();
        errorModal.componentInstance.result = error;
      }
    );
  }
}
