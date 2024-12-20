import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResquestServer } from '../../../data/shared/requestServer';

@Component({
  selector: 'update-paid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update.component.html',
})
export class ModalUpdateOrderPaid {
  data: any;
  //
  requestServer = new ResquestServer();
  activeModal = inject(NgbActiveModal);

  newValue = '';
  isDisabledSaveButton() {
    return true;
  }
  onSave() {
    this.addConfirm();
  }

  onOpen(item: any) {
    this.data = item;
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
    loadingModal.componentInstance.title = 'جاري  المعالجة يرجى الانتظار ';
    const formData = this.requestServer.sharedMethod.apiFormData.getFormData1();

    //
    const data3 = {
      tag: 'updatePaid',
      inputOrderId: this.data.id,
    };
    //
    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.ordersUrl,
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
