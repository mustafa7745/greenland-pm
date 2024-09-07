import { Component, inject } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'ngbd-modal-loading',
  standalone: true,
  templateUrl:'./loading-modal.component.html',
})
export class LoadingModal {
  title = ''
  modal = inject(NgbActiveModal);
}
