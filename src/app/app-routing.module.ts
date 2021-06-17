import { ProductComponent } from './components/products/product/product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './components/products/products-list/products-list.component';

const routes: Routes = [
  { path: 'ProductComponent', component: ProductComponent },
  { path: 'home', component: ProductsListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
