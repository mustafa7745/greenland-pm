import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ModalCustomDelete } from '../../delete/delete-groups.component';
import { ResquestServer } from '../../data/shared/requestServer';
import { UserLocationModal } from '../../user_location/read/read.component';
import { ModalSearchDeliveryMen } from '../../search/delivery_men/search.component';
import { StateController } from '../../data/shared/stateController';
import { ModalSearchProduct } from '../../search/products/search.component';
import { ModalAddUserLocation } from '../add/add.component';
import { ModalUpdateUserLocationStreet } from '../update/street/update.component';
import { ModalUpdateUserLocationContactPhone } from '../update/contactPhone/update.component';
import { ModalUpdateUserLocationLatLong } from '../update/latLong/update.component';
import { ModalUpdateUserLocationNearTo } from '../update/nearTo/update.component';
import { ModalUpdateUserLocationUrl } from '../update/url/update.component';

@Component({
  selector: 'locations',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule],
  // providers: [OrdersComponent],
  templateUrl: './read.component.html',
  styleUrl: './read.component.css',
})
export class ModalReadUserLocations {
  stateController = new StateController();
  userId: any;
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
  isLoadingSearch = false;
  //
  resultData: any;

  title: string = 'تم النسخ';
  message: string = 'succss';
  show: boolean = false;

  showToast() {
    this.show = true;
    setTimeout(() => this.hide(), 3000); // Hide after 3 seconds
  }

  hide() {
    this.show = false;
  }

  onOpenFromProducts(data: any) {
    this.userId = data;
    this.read();
  }

  onOpen(data: any) {
    this.userId = data.id;
    this.read();
  }
  async read() {
    const data3 = {
      tag: 'read',
      inputUserId: this.userId,
    };
    this.isLoading = true;
    this.isError = false;
    //
    console.log('started');

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.usersLocationsUrl,
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
  choose(item: any) {
    this.activeModal.close(item);
  }
  openModalAddUserLocation() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalAddUserLocation,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        fullscreen: false,
      }
    );
    a.componentInstance.onOpen(this.userId);
    a.result.then((r: any) => {
      this.resultData.push(JSON.parse(r));
      // this.stateController.errorInnerSearch = ''
      // this.result = JSON.parse(r);
    });
  }
  openModalUpdateStreet(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateUserLocationStreet,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        fullscreen: false,
      }
    );
    a.componentInstance.onOpen(item);
    a.result.then((r: any) => {
      const data = JSON.parse(r);
      const index = this.resultData.findIndex((el: any) => el.id == data.id);
      if (index > -1) {
        this.resultData[index] = data;
      }
    });
  }
  openModalUpdateUrl(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateUserLocationUrl,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        fullscreen: false,
      }
    );
    a.componentInstance.onOpen(item);
    a.result.then((r: any) => {
      const data = JSON.parse(r);
      const index = this.resultData.findIndex((el: any) => el.id == data.id);
      if (index > -1) {
        this.resultData[index] = data;
      }
    });
  }
  openModalUpdateNearTo(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateUserLocationNearTo,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        fullscreen: false,
      }
    );
    a.componentInstance.onOpen(item);
    a.result.then((r: any) => {
      const data = JSON.parse(r);
      const index = this.resultData.findIndex((el: any) => el.id == data.id);
      if (index > -1) {
        this.resultData[index] = data;
      }
    });
  }
  openModalUpdateLatLong(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateUserLocationLatLong,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        fullscreen: false,
      }
    );
    a.componentInstance.onOpen(item);
    a.result.then((r: any) => {
      const data = JSON.parse(r);
      const index = this.resultData.findIndex((el: any) => el.id == data.id);
      if (index > -1) {
        this.resultData[index] = data;
      }
    });
  }
  openModalUpdateContactPhone(item: any) {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalUpdateUserLocationContactPhone,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        fullscreen: false,
      }
    );
    a.componentInstance.onOpen(item);
    a.result.then((r: any) => {
      const data = JSON.parse(r);
      const index = this.resultData.findIndex((el: any) => el.id == data.id);
      if (index > -1) {
        this.resultData[index] = data;
      }
    });
  }

  copy(item: any) {
    this.requestServer.sharedMethod.copyTextToClipboard(item.latLong);
    this.showToast();
  }
}
