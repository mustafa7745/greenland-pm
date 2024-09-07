import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ResquestServer } from '../../data/shared/requestServer';
import { StateController } from '../../data/shared/stateController';
import { ProductsModal } from '../../products/read/read.component';

@Component({
  selector: 'order',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule],
  templateUrl: './read.component.html',
})
export class CollectionComponent {
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
      // this.read();
    });
  }
  async read() {
    const loadingModal =
      this.requestServer.sharedMethod.customModal.loadingModal();
    loadingModal.componentInstance.title = '  يرجى الانتظار ';

    const data3 = {
      tag: 'read',
      inputDeliveryManId: this.resultSearchData.id,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.collectionsUrl,
      (res) => {
        loadingModal.close();
        const data = JSON.parse(res);
        this.resultData = data;
      },
      (e) => {
        loadingModal.close();
        const errorModal =
          this.requestServer.sharedMethod.customModal.errorModal();
        errorModal.componentInstance.result = e;
      }
    );
  }
  search() {
    this.resultSearchData = null;
    // console.log('dsdsd');

    this.stateController.errorInnerSearch = '';
    const data2 = this.requestServer.encryptData2();
    if (data2.length > 0) {
      this.stateController.isLoadingInnerSearch = true;
      const formData =
        this.requestServer.sharedMethod.apiFormData.getFormData1();

      //

      var data3 = JSON.stringify({
        tag: 'search',
        inputUserPhone: this.searchText,
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
        this.requestServer.sharedMethod.urls.deliveryMenUrl,
        (result) => {
          this.resultSearchData = JSON.parse(result);
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
  add() {
    // const a = this.requestServer.sharedMethod.customModal.modalService.open(
    //   ModalAddCategory,
    //   {
    //     keyboard: false,
    //     backdrop: 'static',
    //     centered: true,
    //   }
    // );
    // a.result.then((r) => {
    //   this.resultData.push(JSON.parse(r));
    // });
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

  addToSelected(item: any) {
    this.stateController.selected.push(item);
  }
  isSelected(item: any) {
    return this.stateController.selected.includes(item);
  }
  getPriceSelected() {
    var sum = 0;
    this.resultData.map((item) => {
      if (this.stateController.selected.includes(item.id)) {
        sum += Number(item.price);
      }
    });
    return sum;
  }
  getAllPrice() {
    var sum = 0;
    this.resultData.map((item) => {
      // if (this.stateController.selected.includes(item.id)) {
      sum += Number(item.price);
      // }
    });
    return sum;
  }
  //
  collectConfirm() {
    const a = this.requestServer.sharedMethod.customModal.confirmAddModal();
    a.componentInstance.title = 'Are You Sure To Add it';
    a.result
      .then((r) => {
        this.collect();
        a.close();
      })
      .catch(() => {
        a.dismiss();
      });
  }
  collect() {
    const data2 = this.requestServer.encryptData2();
    if (data2.length > 0) {
      const loadingModal =
        this.requestServer.sharedMethod.customModal.loadingModal();
      loadingModal.componentInstance.title =
        'جاري الاضافة الجلسه يرجى الانتظار ';
      const formData =
        this.requestServer.sharedMethod.apiFormData.getFormData1();

      //

      var data3 = JSON.stringify({
        tag: 'collect',
        ids: this.stateController.selected,
        // inputProductName: this.newName,
        // inputProductNumber: this.number,
        // inputProductImage: this.image,
        // inputProductPostPrice: this.price,
        // inputProductGroupId: this.productGroup.id,
      });

      formData.set('data2', data2);
      formData.set('data3', data3);
      //
      this.requestServer.request(
        formData,
        this.requestServer.sharedMethod.urls.collectionsUrl,
        (result) => {
          loadingModal.close();
          // this.activeModal.close(result);
          this.resultData = [];
          this.stateController.selected = [];
          const successModal =
            this.requestServer.sharedMethod.customModal.successModal();
          successModal.componentInstance.result = 'تم بنجاح';
        },
        (error) => {
          loadingModal.close();
          const errorModal =
            this.requestServer.sharedMethod.customModal.errorModal();
          errorModal.componentInstance.result = error;
        }
      );
    }
  }
}
