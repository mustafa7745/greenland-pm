import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbActiveModal, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Properties } from '../../data/properties';
import { ProductController } from '../c_p_controller';

@Component({
  selector: 'ngbd-modal-pg-groups-component-from-perm',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule],
  templateUrl: './read.component.html',
})
export class ReadAllProductsModal {
  properties = new Properties('', '');
  activeModal = inject(NgbActiveModal);
  constructor() {
    this.properties.urlRead = this.properties.urls.products_url;
    this.read();
  }

  dataRead = () => {
    return JSON.stringify({
      tag: 'readAll',
    });
  };

  read() {
    this.properties.data3Read = this.dataRead();
    this.properties.read();
    setTimeout(() => {
      console.log(this.properties.list);
    }, 2000);
  }

  export(data: any) {
    // const loadingModal = this.properties.sharedMethod.loadingModal();
    new ProductController().setProducts(data);
    this.properties.sharedMethod.successModal().componentInstance.result =
      this.properties.sharedMethod.globalString.getSuccessAdd();
    // loadingModal.close();
    // const categories = localStorage.getItem(name);
    // if (categories == null) {

    // } else {
    //   let data2 = JSON.parse(categories!);
    //   console.log(data2);

    //   data2.push(r[0]);
    //   console.log(data2);

    //   localStorage.setItem(name, JSON.stringify(data2));
    //   this.data = data2;
    // }

    // const loadingModal = this.properties.sharedMethod.loadingModal();
    // let categories1 = JSON.stringify(categories);
    // // console.log(products1);
    // var formData = new FormData();

    // // console.log(formData.get("data2"));

    // formData.set('cate', categories1);
    // formData.set('process', 'addAll');

    // let req = this.properties.sharedMethod.http.post<any[]>(
    //   'http://localhost/store/categories.php',
    //   formData
    // );
    // req.subscribe({
    //   next: (response) => {
    //     this.activeModal.close();
    // this.properties.sharedMethod.successModal().componentInstance.result =
    //   this.properties.sharedMethod.globalString.getSuccessAdd();
    // loadingModal.close();

    //     console.log(response);
    //   },
    //   error: (err) => {
    //     loadingModal.close();
    //     console.log(err);
    //   },
    // });
  }
}
