import { Component, inject } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'ngbd-error-modal',
  standalone: true,
  templateUrl:'./errorinfo-modal.component.html',
  styleUrl: './errorinfo-modal.component.css',
})
export class ErrorInfoModal {
  result = ''
  modal = inject(NgbActiveModal);
  onOk(){
    this.modal.close()
  }
}
