import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Properties } from '../../data/properties';
import { Observable, ReplaySubject } from 'rxjs';
import { StateController } from '../../data/shared/stateController';
import { ResquestServer } from '../../data/shared/requestServer';

@Component({
  selector: 'search-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
})
export class ModalSearchProduct {
  activeModal = inject(NgbActiveModal);
  stateController = new StateController();
  requestServer = new ResquestServer();
  //
  result: any;
  searchText = '';
  search() {
    // console.log('dsdsd');

    const data2 = this.requestServer.encryptData2();
    if (data2.length > 0) {
      this.stateController.isLoadingInnerSearch = true;
      const formData =
        this.requestServer.sharedMethod.apiFormData.getFormData1();

      //

      var data3 = JSON.stringify({
        tag: 'search',
        inputProductNumber: this.searchText,
        // inputProductName: this.newName,
        // inputProductNumber: this.number,
        // inputProductImage: this.image,
        // inputProductPostPrice: this.price,
        // inputProductGroupId: this.productGroup.id
      });

      formData.set('data2', data2);
      formData.set('data3', data3);
      //
      this.requestServer.request(
        formData,
        this.requestServer.sharedMethod.urls.productsUrl,
        (result) => {
          this.result = JSON.parse(result)
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
  }
  choose() {
    this.activeModal.close(this.result);
  }
}
