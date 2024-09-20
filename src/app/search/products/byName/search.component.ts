import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductController } from '../../../products_contoller/c_p_controller';
import { StateController } from '../../../data/shared/stateController';

@Component({
  selector: 'search-product-by-name',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
})
export class ModalSearchProductByName {
  activeModal = inject(NgbActiveModal);
  productController = new ProductController();
  stateController = new StateController();

  result: any[] = [];
  searchText = '';
  search() {
    this.stateController.isLoadingInnerSearch = true;
    this.result = this.productController.getProductByName(this.searchText);
    this.stateController.isLoadingInnerSearch = false;
  }
  choose(item: any) {
    this.activeModal.close(item);
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.search();
    }
  }
  @ViewChild('inputField') inputField: ElementRef | undefined;

  ngAfterViewInit() {
    // Set focus on the input field after the view initializes
    this.inputField!!.nativeElement.focus();
  }
}
