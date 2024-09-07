import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Properties } from '../data/properties';

@Component({
  selector: 'modal-delete-permissions-groups',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: '',
})
export class ModalCustomDelete {
  propreties = new Properties('', '');
  activeModal = inject(NgbActiveModal);
  selectedItems: string[] = [];
  url: string = '';

  onOpen(data: string[], url: string) {
    this.url = url;
    this.selectedItems = data;
    this.deletecConfirm();
  }
  deleteForm = '';
  setDeleteForm(s: string) {
    this.deleteForm = s;
  }
  deletecConfirm() {
    const a = this.propreties.sharedMethod.confirmModal();
    a.componentInstance.title =
      this.propreties.sharedMethod.globalString.getConfirmDeleteQuestion(
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
    var ids = this.propreties.sharedMethod.ids(this.selectedItems);
    // 
    var data;
    if (this.deleteForm != '') {
      data = JSON.stringify({ tag: this.deleteForm, ids: ids });
    }
    else{
      data = JSON.stringify({ tag: 'delete', ids: ids });
    }
    this.propreties.delete(this.url, data, this.activeModal);
  }
}
