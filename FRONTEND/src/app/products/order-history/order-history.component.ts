import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Client } from 'shared/models/client';
import { ClientState } from 'shared/states/client-state';
import { ApiService } from '../../api.service';
import { Order } from '../order';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  constructor(private store: Store, private api: ApiService) { }
  
  currentClient : Client = null!
  orderHistory$ : Observable<Array<Order>> = null!;

  ngOnInit(): void {
    this.currentClient = this.store.selectSnapshot(ClientState.getClient);
    if(this.currentClient != null){
      this.orderHistory$ = this.api.getOrderHistory(this.currentClient.id_client);
      this.orderHistory$.subscribe(event => console.log(event))
      
    }
  }

}
