import { Component } from '@angular/core';
import {Product} from "../product";
import {ProductService} from "../product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products: Product[] | undefined;

  pageNo = 0;
  snapshotPageNo: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.products = this.productService.getProducts();

    this.snapshotPageNo = +Number(this.activatedRoute.snapshot?.queryParamMap.get('pageNum') ?? 0);

    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.pageNo = +Number(params.get('pageNum') ?? 0);
      console.log('Query params ', this.pageNo);
    });
  }

  nextPage() {
    this.router.navigate(['product'], {
      queryParams: {pageNum: this.pageNo + 1},
    });
  }

}
