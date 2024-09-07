import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StateController } from '../../data/shared/stateController';
import { ResquestServer } from '../../data/shared/requestServer';

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
  search() {
    this.stateController.isLoadingInnerSearch = true;
    this.stateController.errorInnerSearch = '';

    var data3 = {
      tag: 'read',
      inputUserPhone: this.searchText,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.reservationUrl,
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
  choose() {
    this.activeModal.close(this.result);
  }
}
