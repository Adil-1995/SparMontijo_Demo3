import { PipeTransform, Pipe } from '@angular/core';
import { Product } from 'src/app/models/product';

@Pipe({
  name: 'employeeFilter',
})
export class ProductFilterPipe implements PipeTransform {
  transform(product: Product[], searchTerm: any): Product[] {
    if (!product || !searchTerm) {
      return product;
    }
    return product.filter(
      (product) =>
        product.descripcion.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
          -1 ||
        product.codigo
          .toString()
          .toLowerCase()
          .indexOf(searchTerm.toLowerCase()) !== -1 ||
          product.proveedor.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
          -1
          //add filter date
    );
  }
}
