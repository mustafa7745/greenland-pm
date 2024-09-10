import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ResquestServer } from '../../data/shared/requestServer';
import { ProductsModal } from '../../products/read/read.component';
import { StateController } from '../../data/shared/stateController';

@Component({
  selector: 'order',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule],
  templateUrl: './read.component.html',
  styleUrl : './read.component.css'
})
export class OrdersComponent {
  requestServer = new ResquestServer();
  stateController = new StateController();

  isSearchMode = false;
  searchText = '';
  //
  isError = false;
  error = '';
  //
  isLoading = true;
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
      };
      formData.set('data3', JSON.stringify(data3));

      console.log(data2);
      
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
  search() {
    this.resultSearchData = null
    // console.log('dsdsd');

    this.stateController.errorInnerSearch = ""
    const data2 = this.requestServer.encryptData2();
    if (data2.length > 0) {
      this.stateController.isLoadingInnerSearch = true;
      const formData =
        this.requestServer.sharedMethod.apiFormData.getFormData1();

      //

      var data3 = JSON.stringify({
        tag: 'search',
        inputOrderId: this.searchText,
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
        this.requestServer.sharedMethod.urls.ordersUrl,
        (result) => {
          this.resultSearchData = JSON.parse(result)
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
  // add() {
  //   // const a = this.requestServer.sharedMethod.customModal.modalService.open(
  //   //   ModalAddCategory,
  //   //   {
  //   //     keyboard: false,
  //   //     backdrop: 'static',
  //   //     centered: true,
  //   //   }
  //   // );
  //   // a.result.then((r) => {
  //   //   this.resultData.push(JSON.parse(r));
  //   // });
  // }
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
