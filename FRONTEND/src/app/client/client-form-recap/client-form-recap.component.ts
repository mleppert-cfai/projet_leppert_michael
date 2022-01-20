import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Client } from 'shared/models/client';
import { ClientState } from 'shared/states/client-state';

@Component({
  selector: 'app-client-form-recap',
  templateUrl: './client-form-recap.component.html',
  styleUrls: ['./client-form-recap.component.scss']
})
export class ClientFormRecapComponent implements OnInit {

  constructor(private store: Store) { }

  currentClient : Client = null!

  ngOnInit(): void {
    this.currentClient = this.store.selectSnapshot(ClientState.getClient);
  }

}
