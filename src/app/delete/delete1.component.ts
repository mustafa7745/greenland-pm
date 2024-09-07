import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResquestServer } from '../data/shared/requestServer';

@Component({
  selector: 'delete2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: '',
})
export class ModalCustomDelete1 {
  requestServer = new ResquestServer();
  activeModal = inject(NgbActiveModal);
  url: string = '';
  data3: any;

  onOpen(data3: any, url: string) {
    this.url = url;
    this.data3 = data3;
    this.deletecConfirm();
  }
  deleteForm = '';
  setDeleteForm(s: string) {
    this.deleteForm = s;
  }
  deletecConfirm() {
    const a = this.requestServer.sharedMethod.customModal.confirmModal();
    a.componentInstance.title =
      this.requestServer.sharedMethod.globalString.getConfirmDeleteQuestion(
        1
      );
    //
    a.result
      .then((r) => {
        this.delete();
        a.close();
      })
      .catch(() => {
        this.activeModal.dismiss();
      });
  }
  delete() {
    const a = this.requestServer.sharedMethod.customModal.loadingModal();
    a.componentInstance.title = 'جاري الحذف ';

    this.requestServer.request2(
      this.data3,
      this.url,
      (res) => {
        this.activeModal.close();
        a.close();
        const successModal =
          this.requestServer.sharedMethod.customModal.successModal();
        successModal.componentInstance.title = 'تم';
      },
      (e) => {
        a.close();
        this.activeModal.dismiss();
        const errorModal =
          this.requestServer.sharedMethod.customModal.errorModal();
        errorModal.componentInstance.result = e;
      }
    );
  }
}
