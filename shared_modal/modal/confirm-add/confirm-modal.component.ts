import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-confirm-add',
  standalone: true,
  template: `
    <div class="modal-header bg-primary">
      <h4 class="modal-title" id="modal-title">{{ title }}</h4>
      <button
        type="button"
        class="btn-close"
        aria-describedby="modal-title"
        (click)="dissmis()"
      ></button>
    </div>
    <div class="modal-body">
      <p>
        <strong>{{ discription }}</strong>
      </p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel')"
      >
        Cancel
      </button>
      <button type="button" class="btn btn-primary" (click)="modal.close(true)">
        OK
      </button>
    </div>
  `,
})
export class ConfirmAddModal {
  title: any;
  discription: any;
  modal = inject(NgbActiveModal);



  onClickConfirm() {
    this.modal.update;
  }
  dissmis(){
    this.modal.dismiss()
  }


 
}
