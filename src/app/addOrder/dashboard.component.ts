import { HttpClient } from '@angular/common/http';
import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Properties } from '../data/properties';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalSearchUser } from '../search/user/search.component';
import { ResquestServer } from '../data/shared/requestServer';
import { StateController } from '../data/shared/stateController';
import { ModalReadUserOrders } from '../user-orders/read/read.component';
import { ProductController } from '../products_contoller/c_p_controller';
import { ModalReadUserLocations } from '../user-locations/read/read.component';
import { ModalSearchDeliveryMen } from '../search/delivery_men/search.component';
import { ModalShowOrder } from '../show_order/read.component';
import { ModalUpdateUserName } from '../users/update/name/update.component';
import { ModalUpdateUserPassword } from '../users/update/password/update.component';
import { ModalSearchProductByName } from '../search/products/byName/search.component';
import { ModalShowOrderAfterConfirm } from '../show_order/after-confirm/read.component';
@Component({
  selector: 'add-order',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    FormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class AddOrderComponent {
  productsController = new ProductController();
  requestServer = new ResquestServer();
  stateController = new StateController();
  //
  isSearchedOpen = false;
  isOrderViewOpen = false;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.getSumAllProducts();
    this.getSumAllProductsWithDelivery();
    console.log(event.key);
    if (event.key == '*') {
      if (this.isSearchedOpen === false) {
        this.openModalSearchProducts();
      }
    }

    if (event.key == 'ArrowDown') {
      if (this.user != null) {
        if (this.isOrderViewOpen === false) {
          if (this.orderWithDelivery) {
            if (!this.userLocation) {
              this.errorModal('يجب اختيار موقع العميل');
            } else if (!this.deliveryMan) {
              this.errorModal('يجب اختيار موصل');
            } else if (this.getProducts().length == 0) {
              this.errorModal('يجب اختيار منتج واحد على الاقل');
            } else this.openModalShowOrder();
          } else {
            if (this.getProducts().length == 0) {
              this.errorModal('يجب اختيار منتج واحد على الاقل');
            } else this.openModalShowOrder();
          }
        }
      } else {
        this.errorModal('يجب اختيار مستخدم');
      }
    }
    if (event.key == 'ArrowLeft') {
      console.log(' ');
      if (this.products.length > 1) {
        let id = Number.parseInt(document.activeElement?.id.substring(5)!);
        // console.log(id);

        this.products.splice(id, 1);
        setTimeout(() => {
          if (document.getElementById(`input${id - 1}`) != null) {
            // alert("dfd")
            document.getElementById(`input${id - 1}`)?.focus();
          }
        }, 1);
      }
      // if (this.products.length > 1) {
      //   let id = this.products.length -1
      //   if (document.getElementById(`quantity${id}`) != null) {
      //     document.getElementById(`quantity${id}`)?.focus();
      //   }
      // }
      // else{
      //   let id = 0
      //   if (document.getElementById(`quantity${id}`) != null) {
      //     document.getElementById(`quantity${id}`)?.focus();
      //   }
      // }
    }
  }

  errorModal(error: any) {
    const errorModal = this.requestServer.sharedMethod.customModal.errorModal();
    errorModal.componentInstance.result = error;
  }
  userPhoneSearch = '';
  isDisabledSearchButton() {
    return !(this.userPhoneSearch.length > 0);
  }
  user: any;
  userLocation: any;
  currencyController: any;
  currency: any;

  delete(id: number) {
    if (this.products[id].productName != null && this.products.length > 1) {
      // this.products[0]
      this.products.splice(id, 1);
      if (document.getElementById(`quantity${id - 1}`) != null) {
        document.getElementById(`quantity${id - 1}`)?.focus();
      }
    }
  }
  al(id: any) {
    alert('dda');
  }
  openModalSearchUser() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalSearchUser,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
      }
    );
    a.result.then((r) => {
      this.user = r;
      this.isDeliveryWithOrder = false;
      this.userLocation = false;
      this.deliveryMan = false;
    });
  }
  openModalSuccessOrder(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalShowOrderAfterConfirm,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
      }
    );
    a.componentInstance.onOpen(item);
    // a.result.then((r) => {

    // });
  }
  openModalReadOrders() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalReadUserOrders,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
      }
    );
    a.componentInstance.onOpen(this.user);
    // a.result.then((r) => {
    //   this.user = r;
    // });
  }

  deliveryMan: any;

  openModalReadReservations() {
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

  orderWithDelivery = false;
  changeOrderWithDelivery(event: any) {
    if (event.target.checked) {
      this.orderWithDelivery = true;
    } else {
      this.orderWithDelivery = false;
    }
  }
  autoSelectDelveryMan = true;
  changeAutoSelectDelveryMan(event: any) {
    if (event.target.checked) {
      this.autoSelectDelveryMan = true;
    } else {
      this.autoSelectDelveryMan = false;
    }
  }
  isDeliveryWithOrder = false;
  changeDelveryWithOrder(event: any) {
    this.isDeliveryWithOrder = event.target.checked;
  }

  getSumAllProducts() {
    var sum = 0;
    // if (this.products.length > 0) {
    this.products.forEach((e) => {
      var q = e.productQuantity;
      if (q != '') {
        sum = sum + e.productPrice * Number.parseInt(q);
      }
    });

    this.sum = sum;

    return sum;
    // return sum;
  }
  getSumAllProductsWithDelivery() {
    console.log(this.sum);
    console.log(this.deliveryPrice);
    console.log(this.deliveryPrice + this.sum);

    return this.getSumAllProducts() + this.deliveryPrice;
    // return sum;
  }
  getFinalSum() {
    if (this.orderHaveDiscount) {
      if (this.orderWithDelivery) {
        if (this.isDeliveryWithOrder) {
          console.log('dsdd');

          return this.getfinalDiscountWithOrder();
        }
        return this.getfinalDiscount() + this.deliveryPrice;
      }
      return this.getfinalDiscount();
    }

    return this.getSumAllProducts() + this.deliveryPrice;
    // return sum;
  }

  discountMony = true;
  disvcountPerc = false;
  orderHaveDiscount = false;
  changeOrderHaveDiscount(event: any) {
    console.log('event');

    this.orderHaveDiscount = event.target.checked;
  }
  changeDiscountTypeMony(event: any) {
    // console.log("event2");
    // console.log(event.returnValue);
    // if (event.target.checked) {

    // }else{

    // }
    this.discountMony = true;
    this.disvcountPerc = false;
  }
  changeDiscountTypePerc(event: any) {
    // if (event.target.checked) {

    // }else{

    // }

    this.discountMony = false;
    this.disvcountPerc = true;

    console.log('m', this.discountMony);
    console.log('p', this.disvcountPerc);
  }

  openModalReadUserLocations() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalReadUserLocations,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        scrollable: true,
      }
    );
    a.componentInstance.onOpen(this.user);
    a.result.then((r) => {
      this.userLocation = r;
      this.deliveryPrice = r.price;
      this.deliveryActualPrice = r.price;

      console.log(r);
    });
  }
  properties = new Properties('', '');

  discountAmount = 0;
  getfinalDiscount() {
    var sum = 0;
    if (this.orderHaveDiscount) {
      if (this.discountMony) {
        sum = this.getSumAllProducts() - this.discountAmount;
      } else {
        sum =
          this.getSumAllProducts() -
          (this.getSumAllProducts() * this.discountAmount) / 100;
      }
    }
    return sum;
  }
  getfinalDiscountWithOrder() {
    var sum = 0;
    if (this.orderHaveDiscount) {
      if (this.discountMony) {
        sum =
          this.getSumAllProducts() + this.deliveryPrice - this.discountAmount;
      } else {
        sum =
          this.getSumAllProducts() +
          this.deliveryPrice -
          ((this.getSumAllProducts() + this.deliveryPrice) *
            this.discountAmount) /
            100;
      }
    }
    return sum;
  }
  public http = inject(HttpClient);
  result: any;
  ngOnInit() {
    // this.properties.sharedMethod.browserPlatform(()=>{
    //    setTimeout(() => {
    //   if (document.getElementById(`input${1}`) != null) {
    //     // alert("dfd")
    //     document.getElementById(`input${1}`)?.focus();
    //   }
    // }, 1);
    // })
  }

  constructor() {
    // this.properties.sharedMethod.browserPlatform(() => {
    //   this.currencyController = new CurrencyController();
    //   // this.cartController = new CartController();
    //   this.currency = this.currencyController.getCurrency();
    // });
  }
  request<type>() {
    // this.properties.urlRead = this.properties.urls.products_url;
    // this.properties.urlSearch = this.properties.urls.products_url;
    // this.read();
  }
  read() {
    // this.properties.data3Read = this.dataRead(0);
    // this.properties.read();
  }
  dataRead = (number: number) => {
    return JSON.stringify({
      tag: 'readByNumber',
      inputProjectCurrencyId: 1,
      inputProductNumber: number,
    });
  };

  openModalSearchProducts() {
    this.isSearchedOpen = true;
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalSearchProductByName,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
      }
    );
    a.result
      .then((r) => {
        const id = this.products.length - 1;

        this.products[id].productId = r.id;
        this.products[id].productName = r.name;
        this.products[id].productNo = r.number;
        this.products[id].productQuantity = '1';
        this.products[id].productPrice = r.postPrice;

        this.products.push({
          productId: null,
          productNo: null,
          productName: null,
          productQuantity: '',
          productPrice: 0,
          avg: 0,
        });
        this.isSearchedOpen = false;
      })
      .catch(() => {
        this.isSearchedOpen = false;
      });
  }

  product = {
    productId: null,
    productNo: null,
    productName: null,
    productQuantity: '',
    productPrice: 0,
    avg: 0,
  };
  products = [this.product];

  foucsNext(id: number) {
    console.log('mustafa', id);
    if (this.products[id].productNo != null) {
      const p = this.productsController.getProductByNumber(
        this.products[id].productNo!
      );

      if (p) {
        this.products[id].productId = p.id;
        this.products[id].productName = p.name;
        this.products[id].productPrice = p.postPrice;
        setTimeout(() => {
          if (document.getElementById(`quantity${id}`) != null) {
            document.getElementById(`quantity${id}`)?.focus();
          }
        }, 1);
      }
    }
  }
  foucsNextQ(id: number) {
    setTimeout(() => {
      console.log(document.activeElement?.id);
    }, 5000);
    if (this.products.length - 1 == id) {
      if (this.products[id].productName != null) {
        this.products.push({
          productId: null,
          productNo: null,
          productName: null,
          productQuantity: '',
          productPrice: 0,
          avg: 0,
        });
        if (this.products[id].productQuantity == '') {
          this.products[id].productQuantity = '1';
        }
        // console.log(this.products);
        setTimeout(() => {
          if (document.getElementById(`input${id + 1}`) != null) {
            // alert("dfd")
            document.getElementById(`input${id + 1}`)?.focus();
            // this.getSumAllProducts();
          }
        }, 1);
      }
    } else {
      setTimeout(() => {
        if (document.getElementById(`input${id + 1}`) != null) {
          // alert("dfd")
          document.getElementById(`input${id + 1}`)?.focus();
        }
      }, 1);
    }
  }
  sum = 0;

  toInt(string: string) {
    return Number.parseInt(string);
  }
  deliveryPrice = 0;
  deliveryActualPrice = 0;

  //
  getProducts() {
    var inputOrderProdectsIdsWithQnt: any[] = [];
    for (let index = 0; index < this.products.length; index++) {
      if (this.products[index].productId) {
        var data = {
          id: this.products[index].productId,
          qnt: Number.parseInt(this.products[index].productQuantity),
        };
        var isFound = inputOrderProdectsIdsWithQnt.findIndex(
          (item) => item.id === this.products[index].productId
        );

        console.log(isFound);
        if (isFound != -1) {
          inputOrderProdectsIdsWithQnt[isFound].qnt =
            inputOrderProdectsIdsWithQnt[isFound].qnt +
            Number.parseInt(this.products[index].productQuantity);
        } else {
          inputOrderProdectsIdsWithQnt.push(data);
        }
      }
    }

    return inputOrderProdectsIdsWithQnt;
  }
  getProductsWithoutDelivery() {
    const r = {
      tag: 'addWithoutDelivery',
      inputOrderProjectsIdsWithQnt: this.getProducts(),
      user: this.user,
    };
    return r;
  }
  getProductsWithDelivery() {
    const r = {
      tag: 'add',
      inputOrderProjectsIdsWithQnt: this.getProducts(),
      user: this.user,
      price: this.deliveryPrice,
      actualPrice: this.deliveryActualPrice,
      userLocation: this.userLocation,
      deliveryMan: this.deliveryMan,
    };
    return r;
  }

  openModalShowOrder() {
    this.isOrderViewOpen = true;
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalShowOrder,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
      }
    );
    var orderData = this.getProductsWithoutDelivery();
    if (this.orderWithDelivery == true) {
      orderData = this.getProductsWithDelivery();
    }
    console.log(orderData);

    a.componentInstance.onOpen(orderData);
    a.result
      .then((r: any) => {
        this.user = null;
        this.deliveryMan = null;
        this.userLocation = null;
        this.products = [this.product];
        this.openModalSuccessOrder(r);
        this.isOrderViewOpen = false;
      })
      .catch(() => {
        this.isOrderViewOpen = false;
      });
  }
  openModalUpdateUserName() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateUserName,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        fullscreen: false,
      }
    );
    a.componentInstance.onOpen(this.user);
    a.result.then((r: any) => {
      this.user = JSON.parse(r);
    });
  }
  openModalUpdateUserPassword() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateUserPassword,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        fullscreen: false,
      }
    );
    a.componentInstance.onOpen(this.user);

    // a.result.then((r: any) => {
    //   this.user = r;
    // });
  }
}
