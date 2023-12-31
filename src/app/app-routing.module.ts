import { NgModule } from '@angular/core';

import {HomeComponent} from "./home/home.component";
import {ContactComponent} from "./contact/contact.component";
import {ProductComponent} from "./product/product.component";
import {ErrorComponent} from "./error/error.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";

import {RouterModule} from "@angular/router";
import {Routes} from "@angular/router";



export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: ErrorComponent } //используется как "заглушка" для обработки всех маршрутов, которые не соответствуют ни одному из
                                            // определенных маршрутов. Это означает, что если URL-адрес не совпадает ни с одним из определенных
                                            // маршрутов,
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
