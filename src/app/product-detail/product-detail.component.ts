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

  constructor(private _Activatedroute: ActivatedRoute,
              private _router: Router,
              private _productService: ProductService) {
  }


  ngOnInit() {
    this.sub = this._Activatedroute.params.subscribe(params => {
      this.id = params['id'];
      let products = this._productService.getProducts();
      this.product = products.find(p => p.productID == this.id);
    });
  }

  /* Using snapshot
  ngOnInit() {
      this.id=this._Activatedroute.snapshot.params['id'];
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
