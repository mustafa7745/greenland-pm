import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StateController } from '../../data/shared/stateController';
import { ResquestServer } from '../../data/shared/requestServer';

@Component({
  selector: 'search-offer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
})
export class ModalSearchOffer {
  activeModal = inject(NgbActiveModal);
  stateController = new StateController();
  requestServer = new ResquestServer();
  //
  result: any;
  searchText = '';
  search() {
    this.stateController.isLoadingInnerSearch = true
    var data3 = {
      tag: 'search',
      inputOfferName: this.searchText,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.offersUrl,
      (result) => {
        this.result = JSON.parse(result);
        this.stateController.isLoadingInnerSearch = false;
      },
      (error) => {
        this.stateController.errorInnerSearch = error;
        this.stateController.isLoadingInnerSearch = false;
      }
    );
  }
  choose(item:any) {
    this.activeModal.close(item);
  }
}
