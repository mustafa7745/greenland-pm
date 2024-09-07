import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ModalCustomDelete } from '../../delete/delete-groups.component';
import { ResquestServer } from '../../data/shared/requestServer';
import { StateController } from '../../data/shared/stateController';
import { ModalSearchProduct } from '../../search/products/search.component';
import { ProductsModal } from '../../products/read/read.component';

@Component({
  selector: 'orders',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule],
  // providers: [OrdersComponent],
  templateUrl: './read.component.html',
  styleUrl : './read.component.css'
})
export class ModalReadUserOrders {
  stateController = new StateController();
  data: any;
  activeModal = inject(NgbActiveModal);
  // constructor(public ){}
  requestServer = new ResquestServer();
  isSearchMode = false;
  searchText = '';
  //
  isError = false;
  error = '';
  //
  isLoading = true;
  //
  resultData: any;
  //
  resultSearch: any;

  onOpen(data: any) {
    this.data = data;
    this.read();
  }
  async read() {
    const data3 = {
      tag: 'readOrdersOfUsers',
      inputUserId: this.data.id,
    };
    this.isLoading = true;
    this.isError = false;
    //
    console.log('started');

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.ordersUrl,
      (res) => {
        console.log('sucess');

        this.isLoading = false;
        this.isError = false;
        // this.resultData = res;
        const data = JSON.parse(res);
        this.resultData = data;
      },
      (e) => {
        console.log('fail');

        this.isLoading = false;
        this.isError = true;
        this.error = e;
      }
    );
  }
  search() {
    this.stateController.isLoadingInnerSearch = true;
    this.stateController.errorInnerSearch = '';
    var data3 = {
      tag: 'read',
      inputUserPhone: this.searchText,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.usersUrl,
      (result) => {
        this.resultSearch = JSON.parse(result);
        this.stateController.isLoadingInnerSearch = false;
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
  openProducts(item: any) {
    // (new ProductsModal()).onOpen(item);
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ProductsModal,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
        fullscreen: true,
      }
    );
    a.componentInstance.onOpen(item);
  }
}
