import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddProduct } from 'shared/actions/product-action';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  constructor(private store: Store) { }

  @Input() product! : Product;

  ngOnInit(): void {
  }

  addProductToCart(){
    console.log('Add product to cart');
    this.store.dispatch(new AddProduct(this.product));
  }

}
