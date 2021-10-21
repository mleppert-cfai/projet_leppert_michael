import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './product';
import { Categorie } from './categorie';
import { Periode } from './periode';
import { Pays } from './pays';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private httpClient: HttpClient) {}

  public getCatalogue(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(environment.productsUrl);
  }

  public getCategories(): Observable<Array<Categorie>> {
    return this.httpClient.get<Array<Categorie>>(environment.categoriesUrl);
  }

  public getPeriodes(): Observable<Array<Periode>> {
    return this.httpClient.get<Array<Periode>>(environment.periodesUrl);
  }

  public getPays(): Observable<Array<Pays>> {
    return this.httpClient.get<Array<Pays>>(environment.paysUrl);
  }
}
