import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts();
    this.resetForm();
  }

  onSubmit(productForm: NgForm) {
    if (productForm.value.$key == null){
      this.productService.insertProduct(productForm.value);
      Swal.fire(
        'Product has beed inserted!',
        'You clicked the button!',
        'success',
      );
    // tslint:disable-next-line:curly
    }else this.productService.updateProduct(productForm.value);
    console.log(productForm.value);
    this.resetForm(productForm);
  }

  resetForm(productForm?: NgForm) {
    if (productForm != null) {
      productForm.reset();
      this.productService.selectedProduct = new Product();
    }
  }
}
