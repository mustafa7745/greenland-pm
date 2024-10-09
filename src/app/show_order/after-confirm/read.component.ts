import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductController } from '../../products_contoller/c_p_controller';

@Component({
  selector: 'show-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './read.component.html',
  styleUrl:'./read.component.css'
})
export class ModalShowOrderAfterConfirm {
  productController = new ProductController()
  activeModal = inject(NgbActiveModal);
  orderContents: any;

  onOpen(data: string) {
    console.log(data);
    this.orderContents = data;
  }

  getProductsFinalPrice(): number {
    var sum = 0;

    this.orderContents.products.forEach((e:any) => {
      var q = e.productQuantity;
      if (q != '') {
        sum = sum + e.productPrice * Number.parseFloat(q);
      }
    });

    return this.productController.roundToNearestFifty(this.productController.formatPrice(sum))

    // return this.orderContents.products.reduce(
    //   (
    //     sum: number,
    //     product: { productPrice: string; productQuantity: string }
    //   ) => {
    //     return (
    //       sum +
    //       parseInt(product.productPrice, 10) *
    //         parseInt(product.productQuantity, 10)
    //     );
    //   },
    //   0
    // );
  }

  getOffersFinalPrice(): number {
    return this.orderContents.offers.reduce(
      (sum: number, offer: { offerPrice: string; offerQuantity: string }) => {
        return (
          sum +
          parseInt(offer.offerPrice, 10) * parseInt(offer.offerQuantity, 10)
        );
      },
      0
    );
  }

  getAllFinalPrice(): number {
    let sum = this.getProductsFinalPrice() + this.getOffersFinalPrice();

    if (this.orderContents.delivery) {
      sum += parseInt(this.orderContents.delivery.price, 10);
    }

    if (this.orderContents.discount) {
      const amount = parseInt(this.orderContents.discount.amount, 10);
      switch (this.orderContents.discount.type) {
        case '0': {
          // Percentage discount
          const discount = (sum * amount) / 100;
          sum -= discount;
          sum = 50 * Math.round(sum / 50);
          console.log(`Discount: ${discount}`);
          break;
        }

        default: {
          // Fixed amount discount
          sum -= amount;
          break;
        }
      }
    }

    return sum;
  }

  parseInt(text: string, r: number) {
    return parseInt(text, r);
  }
}
