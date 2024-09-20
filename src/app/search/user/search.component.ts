import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StateController } from '../../data/shared/stateController';
import { ResquestServer } from '../../data/shared/requestServer';
import { ModalAddUser } from '../../users/add/add.component';

@Component({
  selector: 'search-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
})
export class ModalSearchUser {
  activeModal = inject(NgbActiveModal);
  stateController = new StateController();
  requestServer = new ResquestServer();
  //
  result: any;
  searchText = '';
  search() {
    this.stateController.isLoadingInnerSearch = true;
    this.stateController.errorInnerSearch = '';
    var data3 = {
      tag: 'read',
      inputUserPhone: this.searchText,
    };

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.usersUrl,
      (result) => {
        this.result = JSON.parse(result);
        this.stateController.isLoadingInnerSearch = false;
      },
      (error) => {
        this.stateController.errorInnerSearch = error;
        this.stateController.isLoadingInnerSearch = false;

        // loadingModal.close();
        // const errorModal =
        //   this.requestServer.sharedMethod.customModal.errorModal();
        // errorModal.componentInstance.result = error;
      }
    );
  }
  choose() {
    this.activeModal.close(this.result);
  }
  openModalAddUser() {
    const a = this.requestServer.sharedMethod.customModal.modalService.open(
      ModalAddUser,
      {
        keyboard: false,
        backdrop: 'static',
        centered: true,
        fullscreen: false,
      }
    );
    a.componentInstance.onOpen(this.searchText);
    a.result.then((r: any) => {
      this.stateController.errorInnerSearch = '';
      this.result = JSON.parse(r);
    });
  }
  @ViewChild('inputField') inputField: ElementRef | undefined;

  ngAfterViewInit() {
    // Set focus on the input field after the view initializes
    this.inputField!!.nativeElement.focus();
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.search();
    }
  }
}
