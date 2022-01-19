import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddProduct, RemoveProduct } from 'shared/actions/product-action';
import { Product } from '../../../../shared/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  constructor(private store: Store) { }

  @Input() product! : Product;

  @Input() isInCart : boolean = false;

  @Input() isInHistory : boolean = false;

  ngOnInit(): void {
  }

  addProductToCart(){
    this.store.dispatch(new AddProduct(this.product));
    this.isInCart = true;
  }

  removeProductToCart(){
    this.store.dispatch(new RemoveProduct(this.product));
    this.isInCart = false;
  }

}
