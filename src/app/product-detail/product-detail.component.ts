import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../product.service";
import {Product} from "../product";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  product: Product | undefined;
  id : number | undefined;
  sub: Subscription | undefined = undefined;

/*Subscription используется для представления подписки на поток данных (например, Observable) и предоставляет
  методы для отмены этой подписки, когда она больше не нужна. Это важно для предотвращения утечек ресурсов и
  неиспользуемых подписок.*/

  constructor(private _ActivatedRoute: ActivatedRoute,
              private _router: Router,
              private _productService: ProductService) {
  }

/*ActivatedRoute - это сервис в Angular, предоставляющий информацию о текущем активном маршруте и его параметрах.
  Он используется для извлечения данных из URL-адреса и маршрутизации на основе этих
  данных. ActivatedRoute предоставляет доступ к параметрам маршрута, фрагменту URL
  и другой информации о текущем маршруте. */

  ngOnInit() {
    this.sub = this._ActivatedRoute.params.subscribe(params => {
      this.id = params['id']; //'Id из маршрута:', id
      let products = this._productService.getProducts();
      this.product = products.find(p => p.productID == this.id);
    });
  }

  /* Using snapshot
  ngOnInit() {
      this.id=this._ActivatedRoute.snapshot.params['id'];
      let products=this._productService.getProducts();
      this.product=products.find(p => p.productID==this.id);
  }
  */

  onBack(): void {
    this._router.navigate(['product']);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
