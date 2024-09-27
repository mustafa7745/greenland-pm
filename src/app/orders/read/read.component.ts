import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ResquestServer } from '../../data/shared/requestServer';
import { ProductsModal } from '../../products/read/read.component';
import { StateController } from '../../data/shared/stateController';
import { OrderService } from './order';
import { ModalReadOrderStatus } from '../../modal/orderStatus/read.component';

@Component({
  selector: 'order',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule],
  templateUrl: './read.component.html',
  styleUrl: './read.component.css',
})
export class OrdersComponent {
  requestServer = new ResquestServer();
  stateController = new StateController();

  selected = '0';
  orderStatus = new OrderService().orderStatus;

  isSearchMode = false;
  searchText = '';
  //
  isError = false;
  error = '';
  //
  isLoading = false;
  isLoadingSearch = false;
  //
  currentItem = 'Television';
  resultData: any[] = [];
  resultSearchData: any;
  //
  cParent = 0;
  ngOnInit() {
    this.requestServer.sharedMethod.browserPlatform(async () => {
      this.read();
    });
  }
  async read(id: any = '0') {
    this.selected = id;
    this.isLoading = true;
    this.isError = false;

    const data3 = {
      tag: 'read',
      inputOrderStatusId: id,
    };

    this.requestServer.request2(
      data3,
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
  openModelReadStatus(item:any) { 
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalReadOrderStatus,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable:true,
        fullscreen: false,
      }
    );
    a.componentInstance.onOpen(item);
    // a.result.then((r) => {
    //   this.searchedProduct = r;
    // });
  }
  search() {
    this.resultSearchData = null;

    this.stateController.errorInnerSearch = '';
    this.stateController.isLoadingInnerSearch = true;

    var data3 = {
      tag: 'search',
      inputOrderId: this.searchText,
    };

    //
    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.ordersUrl,
      (result) => {
        this.resultSearchData = JSON.parse(result);
        console.log(result);

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

  openProducts(item: any) {
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
    a.result.then((r) => {
      // console.log(r);
      if (r.situationId != this.selected) {
        this.resultData.forEach((it) => {
          const index = this.resultData.findIndex(
            (el: any) => el.id == item.id
          );
          if (index > -1) {
            this.resultData.splice(index, 1);
          }
        });
      }
    });
  }
  // openProductsGroups(item: any) {
  //   const a = this.requestServer.sharedMethod.customModal.modalService.open(
  //     ProductsGroupsModal,
  //     {
  //       keyboard: false,
  //       backdrop: 'static',
  //       centered: true,
  //       scrollable: true,
  //       fullscreen: true,
  //     }
  //   );
  //   a.componentInstance.onOpen(item);
  // }

  getDate(item: string) {
    const date = new Date(item);
    return this.requestServer.sharedMethod.formatTimeAgo(date);
  }
}
