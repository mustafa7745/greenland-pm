import { CommonModule } from '@angular/common';
import { Component, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResquestServer } from '../../data/shared/requestServer';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-user-location',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add.component.html',
})
export class ModalAddUserLocation {
  data: any;
  //
  requestServer = new ResquestServer();
  activeModal = inject(NgbActiveModal);

  //
  street = '';
  contactPhone = '';
  latLong = '';
  url = '';
  nearTo = '';

  isDisabledSaveButton() {
    return !(this.street.length > 0);
  }
  onSave() {
    this.addConfirm();
  }
  onOpen(data: any) {
    this.data = data;
    // console.log(this.data);
  }

  addConfirm() {
    const a = this.requestServer.sharedMethod.customModal.confirmAddModal();
    a.componentInstance.title = 'Are You Sure To Add it';
    a.result
      .then((r) => {
        this.add();
        a.close();
      })
      .catch(() => {
        a.dismiss();
      });
  }
  add() {
    const loadingModal =
      this.requestServer.sharedMethod.customModal.loadingModal();
    loadingModal.componentInstance.title = 'جاري الاضافة يرجى الانتظار ';

    var data3 = {
      tag: 'add',
      inputUserId: this.data,
      inputUserLocationStreet: this.street,
      inputUserLocationNearTo: this.nearTo,
      inputUserLocationContactPhone: this.contactPhone,
      inputUserLocationUrl: this.url,
      inputUserLocationLatLong: this.latLong,

    };

    //
    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.usersLocationsUrl,
      (result) => {
        console.log(result);
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
