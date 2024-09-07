import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { inject } from '@angular/core';
import { ConfirmAddModal } from '../../../../shared_modal/modal/confirm-add/confirm-modal.component';
import { ConfirmUpdateModal } from '../../../../shared_modal/modal/confirm-update/confirm-modal.component';
import { ConfirmModal } from '../../../../shared_modal/modal/confirm/confirm-modal.component';
import { ErrorInfoModal } from '../../../../shared_modal/modal/error-info/errorinfo-modal.component';
import { LoadingModal } from '../../../../shared_modal/modal/loading/loading-modal.component';
import { SuccessInfoModal } from '../../../../shared_modal/modal/success-info/successinfo-modal.component';

export class CustomModal {
  modalService = inject(NgbModal);

  successModal(): NgbModalRef {
    return this.modalService.open(SuccessInfoModal, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });
  }
  loadingModal(): NgbModalRef {
    return this.modalService.open(LoadingModal, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });
  }
  errorModal(): NgbModalRef {
    return this.modalService.open(ErrorInfoModal, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });
  }
  confirmModal(): NgbModalRef {
    return this.modalService.open(ConfirmModal, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });
  }
  confirmAddModal(): NgbModalRef {
    return this.modalService.open(ConfirmAddModal, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });
  }
  confirmUpdateModal(): NgbModalRef {
    return this.modalService.open(ConfirmUpdateModal, {
      keyboard: false,
      backdrop: 'static',
      centered: true,
    });
  }
}
