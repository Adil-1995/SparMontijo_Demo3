import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

import { NgForm } from '@angular/forms';

import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  searchTerm: string;
  searchKey: string;
  isEditable: boolean = false;
  productList: Product[];
  newProducts: any[] = [];
  show: boolean = true;
  page_size: number = 10;
  page_number: number = 1;
  pageSizeOption = [5, 10, 20, 100];
  minDate = undefined;
  constructor(public productService: ProductService, private router: Router) {}

  ngOnInit() {
    return this.productService
      .getProducts()
      .snapshotChanges()
      .subscribe((item) => {
        this.productList = [];
        item.forEach((element) => {
          let x = element.payload.toJSON();
          x!['$key'] = element.key;
          this.productList.push(x as Product);
        });

        this.checkDate();
      });
  }

  onSubmit(productForm: NgForm) {
    // if (productForm.value.$key == null) {
    if (productForm.value.$key == null) {
      this.productService.insertProduct(productForm.value);
      Swal.fire(
        'Se ha insertado el producto!',
        'You clicked the button!',
        'success'
      );
    } else this.productService.updateProduct(productForm.value);
    this.resetForm(productForm);
    window.location.reload();
  }

  // checkDate() {
  //   console.log(this.productList.length);
  //   for (let i = 0; i < this.productList.length; i++) {



  //     const today = moment().format('DD/MM/YYYY');
  //     // console.log( "Hoy es : "+ today);

  //     const productDate = this.productList[62].fechaCaducidad;
  //     const productDateFormated = moment(productDate).format('DD/MM/YYYY');

  //     const ProductTwoDays = moment(productDate)
  //       .subtract(2, 'days')
  //       .format('DD/MM/YYYY'); //
  //     console.log("Mi fecha de produto es : ", productDate);

  //     const ProductOneDays = moment(productDate)
  //       .subtract(1, 'days')
  //       .format('DD/MM/YYYY');
  //     const productDateConverted = moment(productDate).format('DD/MM/YYYY');
  //     console.log(" productDateConverted es: " + productDateConverted);

  //     console.log('Two days is :' + ProductTwoDays);
  //     const isEqualTwo = moment(today).isSame(ProductTwoDays);
  //     const isEqualOne = moment(today).isSame(ProductOneDays);
  //     const isEqual = moment(today).isSame(productDateFormated);

  //     if ( isEqual) {
  //       this.newProducts.push(this.productList[62]);
  //     }
  //   }
  // }


  checkDate() {
    console.log(this.productList.length);
    for (let i = 0; i < this.productList.length; i++) {

      const today = moment().format('YYYY/MM/DD');
      console.log( "Hoy es : "+ today);

      const productDate = this.productList[i].fechaCaducidad;
      // const productDateFormated = moment(productDate).format('YYYY/MM/DD');

      const ProductTwoDays = moment(productDate)
        .subtract(2, 'days')
        .format('YYYY/MM/DD'); //
      console.log("Mi fecha de produto es : ", productDate);

      const ProductOneDays = moment(productDate)
        .subtract(1, 'days')
        .format('YYYY/MM/DD');
      const productDateConverted = moment(productDate).format('YYYY/MM/DD');
      // console.log(" productDateConverted es: " + productDateConverted);

      console.log('Two days is :' + ProductTwoDays);
      const isEqualTwo = moment(today).isSame(ProductTwoDays);
      const isEqualOne = moment(today).isSame(ProductOneDays);
      const isEqual = moment(today).isSame(productDate);
      const isBefore = moment(today).isAfter(productDate);

      console.log(isEqualTwo);
      console.log(isEqualOne);
      console.log(isEqual);


      if ( isEqual || isEqualTwo || isEqualOne || isBefore) {
        this.newProducts.push(this.productList[i]);
      }
    }
  }


  onEdit(product: Product) {
    this.isEditable = true;
    this.productService.selectedProduct = Object.assign({}, product);
  }

  onDeletet($key: string) {
    Swal.fire({
      title: 'Estás seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct($key);
        Swal.fire('Eliminado!', 'Producto has sido borrado.', 'success');
        window.location.reload();
      }
    });
  }

  resetForm(productForm?: NgForm) {
    if (productForm != null) {
      productForm.reset();
      this.productService.selectedProduct = new Product();
    }
  }

  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }
}
