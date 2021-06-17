import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList: AngularFireList<any>;
  selectedProduct: Product = new Product();

  constructor(private firebase: AngularFireDatabase, private toastr: ToastrService) { }

  getProducts(){
   return this.productList = this.firebase.list('products');
  }

  insertProduct(product: Product){
    this.productList.push({
      codigo: product.codigo,
      descripcion: product.descripcion,
      proveedor: product.proveedor,
      fechaCaducidad: product.fechaCaducidad
    });
  }

  updateProduct(product: Product){
    this.productList.update(product.$key, {
      codigo: product.codigo,
      descripcion: product.descripcion,
      proveedor: product.proveedor,
      fechaCaducidad: product.fechaCaducidad
    });
    this.toastr.success('Successfull, Producto ha actualizado correctamente.');
  }

  deleteProduct($key: string){
    this.productList.remove($key);
  }


}
