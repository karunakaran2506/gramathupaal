import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'product'
})
export class ProductPipe implements PipeTransform {
  transform(products: Array<any>, category: any) {
    if (category === 'all') {
      return products;
    }
    else {
      let product = products.filter(x => x.category === category);
      return product.length ? product : [];
    }
  }
}
