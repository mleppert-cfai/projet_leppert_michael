import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RemoveAllProducts, RemoveProduct } from 'shared/actions/product-action';
import { ProductState } from 'shared/states/product-state';
import { Product } from '../../../../shared/models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private store: Store) { }

  @Select(ProductState.getListeProducts) listProduct$!: Observable<Array<Product>>;

  justBuyed : boolean = false;

  ngOnInit(): void {
  }

  removeProduct(prod: Product){
    this.store.dispatch(new RemoveProduct(prod));
  }

  onSubmit() : void{
    this.store.dispatch(new RemoveAllProducts());
    this.justBuyed = true;
  }

}
