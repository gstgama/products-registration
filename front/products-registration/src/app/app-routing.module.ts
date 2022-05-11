import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { ProductDetailComponent } from './products/product-detail/product-detail.component';

import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: 'app', redirectTo: "app/products" },
  {
    path: 'app', component: AppComponent,
    children:
    [
      { path: 'products', component: ProductsComponent },
      { path: 'detail', component: ProductDetailComponent },
      { path: 'detail/:id', component: ProductDetailComponent }
    ]
  }
  // {path: '', redirectTo:'products', pathMatch: 'full'},
  // {path: '**', redirectTo:'products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
