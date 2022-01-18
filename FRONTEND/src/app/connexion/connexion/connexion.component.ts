import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Client } from 'shared/models/client';
import { AddClient, RemoveClient, RemoveJwtToken } from 'shared/actions/client-action';
import { ClientState } from 'shared/states/client-state';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  constructor(private fb : FormBuilder, private api: ApiService, private router : Router, private store : Store) { }

  connexionForm !: FormGroup;

  client$ : Observable<Client> = null!;
  subscription !: Subscription;

  @Select(ClientState.getClient) currentClient$!: Observable<Client>;

  errorMsg : String = '';
  successMsg : String = '';

  ngOnInit(): void {
    this.connexionForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });

    if(this.currentClient$ != null){
      this.client$ = this.currentClient$;
    }
  }

  ngOnDestroy(): void {
    if(this.subscription != null){
      this.subscription.unsubscribe();
    }
  }

  connect() : void {
    if(this.subscription != null){
      this.subscription.unsubscribe();
    }
    this.subscription = this.api.postLogin(this.connexionForm.value.login, this.connexionForm.value.password).subscribe(
        event => {
          console.log(event);
          this.client$ = this.api.getLogin(this.connexionForm.value.login);
          this.successMsg = 'Vous êtes connecté'
          this.errorMsg = '';
          this.client$.subscribe(event => {
            this.store.dispatch(new AddClient(event));
            //console.log('MAIL : '+event.email);
            //console.log('CLIENT : '+event)
            
          });
          //this.router.navigate(['/']);
        },
        error => {
          console.log(error);
          this.successMsg = '';
          this.errorMsg = error.error.ERROR;
        }
    );
  }

  disconnect() : void {
    this.client$ = null!;
    this.store.dispatch(new RemoveClient());
    this.store.dispatch(new RemoveJwtToken());
    this.router.navigate(['/']);

  }

}
