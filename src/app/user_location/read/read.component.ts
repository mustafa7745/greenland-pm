import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbActiveModal, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ResquestServer } from '../../data/shared/requestServer';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'location',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule,GoogleMapsModule],
  templateUrl: './read.component.html',
})
export class UserLocationModal {
  data: any;
  activeModal = inject(NgbActiveModal);
  requestServer = new ResquestServer();
  isSearchMode = false;
  searchText = '';
  //
  isError = false;
  error = '';
  //
  isLoading = true;
  isLoadingSearch = false;
  //
  resultData: any;
  onOpen(data: any) {
    this.data = data;
    this.resultData = data
    this.isLoading = false
  }
  async read() {
    console.log('mustafafaffa');
    // aw;
    const data2 = this.requestServer.encryptData2();
    if (data2.length > 0) {
      this.isLoading = true;
      this.isError = false;
      const formData =
        this.requestServer.sharedMethod.apiFormData.getFormData1();
      formData.set('data2', data2);
      const data3 = {
        tag: 'read',
        inputOrderId: this.data.id,
      };
      formData.set('data3', JSON.stringify(data3));

      this.requestServer.request(
        formData,
        this.requestServer.sharedMethod.urls.ordersUrl,
        (res) => {
          this.isLoading = false;
          this.isError = false;
          // this.resultData = res;
          const data = JSON.parse(res);
          this.resultData = data;
        },
        (e) => {
          this.isLoading = false;
          this.isError = true;
          this.error = e;
        }
      );
    }
  }
  search() {}
  add() {
    // const a = this.requestServer.sharedMethod.customModal.modalService.open(
    //   ModalAddProduct,
    //   {
    //     keyboard: false,
    //     backdrop: 'static',
    //     centered: true,
    //   }
    // );
    // a.componentInstance.onOpen(this.data);
    // a.result.then((r) => {
    //   this.resultData.push(JSON.parse(r));
    // });
  }

 
}
