import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResquestServer } from '../data/shared/requestServer';

@Component({
  selector: 'delete1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: '',
})
export class ModalCustomDelete {
  requestServer = new ResquestServer();
  activeModal = inject(NgbActiveModal);
  selectedItems: string[] = [];
  url: string = '';

  onOpen(data: string[], url: string) {
    console.log(data);
    
    this.url = url;
    this.selectedItems = data;
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
        this.selectedItems.length
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
    //
    var data3;
    if (this.deleteForm != '') {
      data3 = { tag: this.deleteForm, ids: this.selectedItems };
    } else {
      data3 = { tag: 'delete', ids: this.selectedItems };
    }
    // this.requestServer.request().delete(this.url, data, this.activeModal);

    // console.log('mustafafaffa');
    // aw;
    const data2 = this.requestServer.encryptData2();
    if (data2.length > 0) {
      const formData =
        this.requestServer.sharedMethod.apiFormData.getFormData1();
      formData.set('data2', data2);
      // const data3 = {
      //   tag: 'read',
      // };
      formData.set('data3', JSON.stringify(data3));

      this.requestServer.request(
        formData,
        this.requestServer.sharedMethod.urls.ordersUrl,
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
}
