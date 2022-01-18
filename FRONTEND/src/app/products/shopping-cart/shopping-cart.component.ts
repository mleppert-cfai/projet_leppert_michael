import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { RemoveAllProducts, RemoveProduct } from 'shared/actions/product-action';
import { Client } from 'shared/models/client';
import { ClientState } from 'shared/states/client-state';
import { ClientStateModel } from 'shared/states/client-state-model';
import { ProductState } from 'shared/states/product-state';
import { ApiService } from 'src/app/api.service';
import { Product } from '../../../../shared/models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private store: Store,  private api: ApiService) { }

  @Select(ProductState.getListeProducts) listProduct$!: Observable<Array<Product>>;
  @Select(ClientState.getClient) client$!: Observable<Client>;

  errorMsg : String = '';
  justBuyed : boolean = false;

  subscription !: Subscription;

  ngOnInit(): void {
    if(this.subscription != null){
      this.subscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    if(this.subscription != null){
      this.subscription.unsubscribe();
    }
  }

  removeProduct(prod: Product){
    this.store.dispatch(new RemoveProduct(prod));
  }

  onSubmit() : void{
    let client = this.store.selectSnapshot(ClientState.getClient);
    if(client == null){
      this.errorMsg = 'Vous devez être connecté pour passer une commande'
    }
    else {
      this.errorMsg = '';
      let products = this.store.selectSnapshot(ProductState.getListeProducts);
      let id_products : number[] = [];
      products.forEach(product => {
        id_products.push(product.id_product);
      })
      this.subscription = this.api.postBuy(client.id_client, id_products).subscribe(event => console.log(event));
      this.store.dispatch(new RemoveAllProducts());
      this.justBuyed = true;
    }
  }

}
