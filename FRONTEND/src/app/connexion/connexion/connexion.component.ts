import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Client } from 'shared/models/client';
import { AddClient, RemoveClient, RemoveJwtToken } from 'shared/actions/client-action';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  constructor(private fb : FormBuilder, private api: ApiService, private router : Router, private store : Store) { }

  connexionForm !: FormGroup;

  client$ !: Observable<Client>;
  subscription !: Subscription;

  ngOnInit(): void {
    this.connexionForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
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
    this.subscription = this.api.postLogin(this.connexionForm.value.login, this.connexionForm.value.password).subscribe(event => {console.log(event) ; this.client$ = this.api.getLogin(this.connexionForm.value.login);});
  }

  disconnect() : void {
    this.client$ = null!;
    this.store.dispatch(new RemoveClient());
    this.store.dispatch(new RemoveJwtToken());
    this.router.navigate(['/']);

  }

}
