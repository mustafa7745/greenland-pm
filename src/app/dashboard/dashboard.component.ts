
import {
  Component,
  TemplateRef,
  inject,
} from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { SharedMethod } from '../data/shared-method';
import { Properties } from '../data/properties';
import { CommonModule } from '@angular/common';
import { ResquestServer } from '../data/shared/requestServer';
import { ProductController } from '../products_contoller/c_p_controller';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  properties = new Properties('', '');
  currency: any;
  phone = '';
  password = '';
  sharedMethod = new SharedMethod();
  currencyController: any;
  cartController: any;
  requestServer = new ResquestServer();
  constructor() {
    this.sharedMethod.browserPlatform(() => {});
  }
  info: any;

  private offcanvasService = inject(NgbOffcanvas);
  closeResult = '';

  open(content: TemplateRef<any>) {
    this.offcanvasService
      .open(content, { ariaLabelledBy: 'offcanvas-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  updateToken() {
    this.requestServer.refresh_token();
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }
  importProducts() {
    const data3 = {
      tag: 'readAll',
    };
    const loadingModal =
      this.requestServer.sharedMethod.customModal.loadingModal();
    loadingModal.componentInstance.title = ' يرجى الانتظار';

    this.requestServer.request2(
      data3,
      this.requestServer.sharedMethod.urls.productsUrl,
      (res) => {
        (new ProductController()).setProducts(JSON.parse(res))
        console.log(res);

        loadingModal.close();
      },
      (e) => {
        loadingModal.close();
        const errorModal =
          this.requestServer.sharedMethod.customModal.errorModal();
        errorModal.componentInstance.result = e;
      }
    );
  }
  logout() {
    // this.cartController.clearCart();
    this.properties.sharedMethod.removeLogin();
    this.offcanvasService.dismiss();
    this.properties.sharedMethod.sharedNavigate.navigateToLogin();
  }
}
