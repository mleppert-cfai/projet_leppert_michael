import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private productService: ProductServiceService) {
  }
  product$ !: Observable<Product>;

  ngOnInit(): void {
    this.product$ = this.productService.getCatalogue().pipe(
      map(products => products.filter(prod => prod.id_product === this.route.snapshot.params.ref)[0])
    );
  }

}
