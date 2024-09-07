import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ModalCustomDelete } from '../../delete/delete-groups.component';
import { ResquestServer } from '../../data/shared/requestServer';
import { ModalSearchDeliveryMen } from '../../search/delivery_men/search.component';
import { ModalUpdateProductQuantity } from '../update/quantity/update.component';
import { StateController } from '../../data/shared/stateController';
import { ModalSearchProduct } from '../../search/products/search.component';
import { ModalCencelOrder } from '../update/cencel/update.component';
import { ModalAddDiscount } from '../add/discount/add.component';
import { ModalUpdateDiscountType } from '../update/type/update.component';
import { ModalUpdateDiscountAmount } from '../update/amount/update.component';
import { ModalCustomDelete1 } from '../../delete/delete1.component';
import { ModalUpdateActualPrice } from '../update/actualPrice/update.component';
import { ModalSearchOffer } from '../../search/offers/search.component';
import { ModalUpdateOfferQuantity } from '../update/offerQuantity/update.component';
import { ModalUpdateDeliveryPrice } from '../update/price/update.component';

@Component({
  selector: 'order-products-info',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule],
  // providers: [OrdersComponent],
  templateUrl: './read.component.html',
  styleUrl: './read.component.css',
})
export class ProductsModal {
  stateController = new StateController();
  offersStateController = new StateController();

  activeModal = inject(NgbActiveModal);
  requestServer = new ResquestServer();
  //
  data: any; // Order
  user: any;
  products: any;
  delivery: any;
  location: any;
  discount: any;

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
  //
  deliveryMan: any;
  orderDelivery: any;
  orderDeliveryMan: any;
  isGetDataOrderDelivery = false;
  systemOrderNumber = '';
  deliveryLocation: any;
  cenceledDescription: any;
  //
  searchedProduct: any;
  searchedOffer: any;

  productQuantity = '';
  offerQuantity = '';

  @Output() messageEvent = new EventEmitter<number>();
  //
  @Input() c = 1;
  sendMessageToParent() {
    this.messageEvent.emit(this.c);
    this.c = this.c + 1;
    // console.log(this.c);
  }
  onOpen(data: any) {
    this.data = data;
    console.log(this.data);

    // this.read();

    console.log(this.data.id);
  }
  readOrderDelivery() {
    // this.isLoading = true;
    // this.isError = false;
    const loadingModal =
      this.requestServer.sharedMethod.customModal.loadingModal();
    loadingModal.componentInstance.title = 'يرجى الانتظار';
    const data3 = {
      tag: 'readOrderDelivery',
      inputOrderId: this.data.id,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.ordersUrl,
      (res) => {
        loadingModal.close();
        // this.isLoading = false;
        // this.isError = false;
        // this.resultData = res;
        console.log(res);

        const data = JSON.parse(res);
        this.orderDelivery = data;
        this.isGetDataOrderDelivery = true;
      },
      (e) => {
        // this.isLoading = false;
        // this.isError = true;
        // this.error = e;
        loadingModal.close();
        const errorModal =
          this.requestServer.sharedMethod.customModal.errorModal();
        errorModal.componentInstance.result = e;
      }
    );
  }
  readUser() {
    // this.isLoading = true;
    // this.isError = false;
    const loadingModal =
      this.requestServer.sharedMethod.customModal.loadingModal();
    loadingModal.componentInstance.title = 'يرجى الانتظار';
    const data3 = {
      tag: 'readById',
      inputUserId: this.data.userId,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.usersUrl,
      (res) => {
        loadingModal.close();
        // this.isLoading = false;
        // this.isError = false;
        // this.resultData = res;
        console.log(res);

        const data = JSON.parse(res);
        this.user = data;
      },
      (e) => {
        // this.isLoading = false;
        // this.isError = true;
        // this.error = e;
        loadingModal.close();
        const errorModal =
          this.requestServer.sharedMethod.customModal.errorModal();
        errorModal.componentInstance.result = e;
      }
    );
  }
  readCenceledDescription() {
    // this.isLoading = true;
    // this.isError = false;
    const loadingModal =
      this.requestServer.sharedMethod.customModal.loadingModal();
    loadingModal.componentInstance.title = 'يرجى الانتظار';
    const data3 = {
      tag: 'readOrderCenceled',
      inputOrderId: this.data.id,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.ordersUrl,
      (res) => {
        loadingModal.close();
        // this.isLoading = false;
        // this.isError = false;
        // this.resultData = res;
        console.log(res);

        const data = JSON.parse(res);
        this.cenceledDescription = data;
      },
      (e) => {
        // this.isLoading = false;
        // this.isError = true;
        // this.error = e;
        loadingModal.close();
        const errorModal =
          this.requestServer.sharedMethod.customModal.errorModal();
        errorModal.componentInstance.result = e;
      }
    );
  }
  readOrderDeliveryMan() {
    const loadingModal =
      this.requestServer.sharedMethod.customModal.loadingModal();
    loadingModal.componentInstance.title = 'يرجى الانتظار';
    const data3 = {
      tag: 'readById',
      inputDeliveryManId: this.orderDelivery.deliveryManId,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.deliveryMenUrl,
      (res) => {
        loadingModal.close();
        const data = JSON.parse(res);
        this.orderDeliveryMan = data;
      },
      (e) => {
        // this.isLoading = false;
        // this.isError = true;
        // this.error = e;
        loadingModal.close();
        const errorModal =
          this.requestServer.sharedMethod.customModal.errorModal();
        errorModal.componentInstance.result = e;
      }
    );
  }
  readOrderDeliveryManOnAcceptance(id: string) {
    const loadingModal =
      this.requestServer.sharedMethod.customModal.loadingModal();
    loadingModal.componentInstance.title = 'يرجى الانتظار';
    const data3 = {
      tag: 'readById',
      inputDeliveryManId: id,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.deliveryMenUrl,
      (res) => {
        loadingModal.close();
        const data = JSON.parse(res);
        this.orderDeliveryMan = data;
      },
      (e) => {
        // this.isLoading = false;
        // this.isError = true;
        // this.error = e;
        loadingModal.close();
        const errorModal =
          this.requestServer.sharedMethod.customModal.errorModal();
        errorModal.componentInstance.result = e;
      }
    );
  }
  readProducts() {
    // this.isLoading = true;
    // this.isError = false;
    const loadingModal =
      this.requestServer.sharedMethod.customModal.loadingModal();
    loadingModal.componentInstance.title = 'يرجى الانتظار';
    const formData = this.requestServer.sharedMethod.apiFormData.getFormData1();
    const data3 = {
      tag: 'readOrderProducts',
      inputOrderId: this.data.id,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.ordersUrl,
      (res) => {
        loadingModal.close();
        // this.isLoading = false;
        // this.isError = false;
        // this.resultData = res;
        const products = JSON.parse(res);
        console.log(products);
        
        this.products = products;
      },
      (e) => {
        // this.isLoading = false;
        // this.isError = true;
        // this.error = e;
        loadingModal.close();
        const errorModal =
          this.requestServer.sharedMethod.customModal.errorModal();
        errorModal.componentInstance.result = e;
      }
    );
  }
  search() {}
 

  openModalDeleteProducts() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalCustomDelete,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
      }
    );
    a.componentInstance.onOpen(
      this.stateController.selected,
      this.requestServer.sharedMethod.urls.ordersUrl
    );
    a.result.then((r) => {
      this.stateController.selected.forEach((id) => {
        const index = this.products.products.findIndex(
          (el: any) => el.id == id
        );
        if (index > -1) {
          this.products.products.splice(index, 1);
        }
      });
      this.stateController.selected = [];
    });
  }
  openModalDeleteOffers() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalCustomDelete,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
      }
    );
    a.componentInstance.setDeleteForm('deleteOffers');
    a.componentInstance.onOpen(
      this.offersStateController.selected,
      this.requestServer.sharedMethod.urls.ordersUrl
    );
    a.result.then((r) => {
      this.offersStateController.selected.forEach((id) => {
        const index = this.products.offers.findIndex((el: any) => el.id == id);
        if (index > -1) {
          this.products.offers.splice(index, 1);
        }
      });
      this.offersStateController.selected = [];
    });
  }
  // openUserLocationModal(item: any) {
  //   const a = this.requestServer.sharedMethod.customModal.modalService.open(
  //     UserLocationModal,
  //     {
  //       keyboard: false,
  //       backdrop: 'static',
  //       centered: true,
  //       fullscreen: false,
  //     }
  //   );
  //   a.componentInstance.onOpen(item);
  //   a.result.then((r) => {
  //     this.resultData.push(JSON.parse(r));
  //   });
  // }
  openChooseDeliveryManModal() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalSearchDeliveryMen,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        fullscreen: false,
      }
    );
    // a.componentInstance.onOpen(item);
    a.result.then((r) => {
      this.deliveryMan = r;
    });
  }
  openModelSearchProduct() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalSearchProduct,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        fullscreen: false,
      }
    );
    // a.componentInstance.onOpen(item);
    a.result.then((r) => {
      this.searchedProduct = r;
    });
  }
  openModelSearchOffer() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalSearchOffer,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        fullscreen: false,
      }
    );
    // a.componentInstance.onOpen(item);
    a.result.then((r) => {
      this.searchedOffer = r;
    });
  }
  openModalUpdateProductQuantity(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateProductQuantity,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        fullscreen: false,
      }
    );
    a.componentInstance.onOpen(item);
    a.result.then((r) => {
      const data = JSON.parse(r);
      const index = this.products.products.findIndex(
        (el: any) => el.id == data.id
      );
      if (index > -1) {
        this.products.products[index] = data;
      }
    });
  }
  openModalUpdateOfferQuantity(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateOfferQuantity,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        fullscreen: false,
      }
    );
    a.componentInstance.onOpen(item);
    a.result.then((r) => {
      const data = JSON.parse(r);
      const index = this.products.offers.findIndex(
        (el: any) => el.id == data.id
      );
      if (index > -1) {
        this.products.offers[index] = data;
      }
    });
  }
  openModalUpdateActualPrice(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateActualPrice,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        fullscreen: false,
      }
    );
    a.componentInstance.onOpen(item);
    a.result.then((r) => {
      this.orderDelivery.actualPrice = JSON.parse(r).actualPrice;
      // console.log(r);
    });
  }
  openModalUpdateDeliveryPrice() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateDeliveryPrice,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        fullscreen: false,
      }
    );
    a.componentInstance.onOpen(this.products.delivery);
    a.result.then((r) => {
      this.products.delivery = JSON.parse(r);
    });
  }
  //
  openModalAddDiscount() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalAddDiscount,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
      }
    );
    a.componentInstance.onOpen(this.data);
    a.result.then((r) => {
      // console.log(r);
      this.products.discount = JSON.parse(r);
      // console.log(this.resultData);
    });
  }
  openModalUpdateDiscountType(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateDiscountType,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
      }
    );
    a.componentInstance.onOpen(item);
    a.result.then((r) => {
      this.products.discount = JSON.parse(r);
    });
  }
  openModalDeleteOrderDiscount(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalCustomDelete1,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
      }
    );
    const data3 = {
      tag: 'deleteOrderDiscount',
      inputOrderDiscountId: item.id,
    };
    a.componentInstance.onOpen(
      data3,
      this.requestServer.sharedMethod.urls.ordersUrl
    );
    a.result.then((r) => {
      this.products.discount = null;
    });
  }
  openModalUpdateDiscountAmount(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateDiscountAmount,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
      }
    );
    a.componentInstance.onOpen(item);
    a.result.then((r) => {
      this.products.discount = JSON.parse(r);
    });
  }
  //
  getDate(item: string) {
    const date = new Date(item);
    return this.requestServer.sharedMethod.formatTimeAgo(date);
  }
  sendRequsetConfirmOrder() {
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
        tag: 'add',
        inputDeliveryManId: this.deliveryMan.id,
        inputOrderDeliveryId: this.orderDelivery.id,
      });

      formData.set('data2', data2);
      formData.set('data3', data3);
      //
      this.requestServer.request(
        formData,
        this.requestServer.sharedMethod.urls.acceptaceUrl,
        (result) => {
          loadingModal.close();
          this.activeModal.close(result);

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
  addProductToOrder() {
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
        tag: 'addProductToOrder',
        inputOrderId: this.data.id,
        inputProductId: this.searchedProduct.id,
        inputProductQuantity: this.productQuantity,
      });

      formData.set('data2', data2);
      formData.set('data3', data3);
      //
      this.requestServer.request(
        formData,
        this.requestServer.sharedMethod.urls.ordersUrl,
        (result) => {
          loadingModal.close();
          // this.activeModal.close(result);
          this.products.products.push(JSON.parse(result));
          const successModal =
            this.requestServer.sharedMethod.customModal.successModal();
          successModal.componentInstance.result = 'تم بنجاح';
          this.searchedProduct = null;
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
  addOfferToOrder() {
    const loadingModal =
      this.requestServer.sharedMethod.customModal.loadingModal();
    loadingModal.componentInstance.title = 'جاري الاضافة الجلسه يرجى الانتظار ';

    //

    var data3 = {
      tag: 'addOfferToOrder',
      inputOrderId: this.data.id,
      inputOfferId: this.searchedOffer.id,
      inputOfferQuantity: this.offerQuantity,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.ordersUrl,
      (result) => {
        loadingModal.close();
        // this.activeModal.close(result);
        this.products.offers.push(JSON.parse(result));
        const successModal =
          this.requestServer.sharedMethod.customModal.successModal();
        successModal.componentInstance.result = 'تم بنجاح';
        this.searchedOffer = null;
      },
      (error) => {
        loadingModal.close();
        const errorModal =
          this.requestServer.sharedMethod.customModal.errorModal();
        errorModal.componentInstance.result = error;
      }
    );
  }
  async readDeliveryLocation() {
    const loadingModal =
      this.requestServer.sharedMethod.customModal.loadingModal();
    loadingModal.componentInstance.title = 'يرجى الانتظار ';

    const data3 = {
      tag: 'readById',
      inputUserLocationId: this.orderDelivery.userLocationId,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.usersLocationsUrl,
      (res) => {
        loadingModal.close();
        // this.resultData = res;
        const data = JSON.parse(res);
        this.deliveryLocation = data;
      },
      (e) => {
        loadingModal.close();
        const errorModal =
          this.requestServer.sharedMethod.customModal.errorModal();
        errorModal.componentInstance.result = e;
      }
    );
  }
  updateSystemOrderNumber() {
    const loadingModal =
      this.requestServer.sharedMethod.customModal.loadingModal();
    loadingModal.componentInstance.title = 'جاري الاضافة الجلسه يرجى الانتظار ';

    var data3 = {
      tag: 'updateSystemOrderNumber',
      inputOrderId: this.data.id,
      inputOrderSystemNumber: this.systemOrderNumber,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.ordersUrl,
      (result) => {
        loadingModal.close();
        this.data.systemOrderNumber = this.systemOrderNumber;
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
  openModalCencelOreder() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalCencelOrder,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
      }
    );
    a.componentInstance.onOpen(this.data);
  }

  //
  getProductsFinalPrice() {
    var sum = 0;
    this.products.products.forEach((element: any) => {
      sum += Number(element.productPrice) * Number(element.productQuantity);
    });
    return sum;
  }
  getOffersFinalPrice() {
    var sum = 0;
    this.products.offers.forEach((element: any) => {
      sum += Number(element.offerPrice) * Number(element.offerQuantity);
    });
    return sum;
  }

  getAllFinalPrice() {
    var sum = this.getProductsFinalPrice() + this.getOffersFinalPrice();
    if (this.products.delivery) {
      sum = sum + Number(this.products.delivery.price);
    }
    if (this.products.discount) {
      const amount = this.products.discount.amount;
      if (this.products.discount.type == '0') {
        const discount = (sum * amount) / 100;
        sum = sum - discount;
        sum = Math.floor(sum);
        console.log('dffdf', discount);
      } else {
        sum = sum - amount;
      }
    }
    return sum;
  }

  toggleProductSelection(productId: number): void {
    const index = this.stateController.selected.indexOf(productId);
    if (index === -1) {
      // إذا لم يكن المنتج محدداً، أضفه إلى القائمة
      this.stateController.selected.push(productId);
    } else {
      // إذا كان المنتج محدداً، أزله من القائمة
      this.stateController.selected.splice(index, 1);
    }
  }

  toggleOfferSelection(offerId: number): void {
    const index = this.offersStateController.selected.indexOf(offerId);
    if (index === -1) {
      // إذا لم تكن العرض محددة، أضفها إلى القائمة
      this.offersStateController.selected.push(offerId);
    } else {
      // إذا كانت العرض محددة، ازلها من القائمة
      this.offersStateController.selected.splice(index, 1);
    }
  }
}
