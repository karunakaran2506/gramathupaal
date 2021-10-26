import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cartquantity'
})
export class CartquantityPipe implements PipeTransform {

  transform(cartitems: Array<any>, productId: string) {
    if (cartitems.length === 0) {
      return 0;
    }
    else {
      let product = cartitems.filter(x => x.product == productId);
      return product.length ? product[0].quantity : 0;
    }
  }

}
