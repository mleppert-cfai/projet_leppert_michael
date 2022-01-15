import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../../../shared/models/product';
import { Category } from './category';
import { Period } from './period';
import { Country } from './country';

@Injectable({
  providedIn: 'any'
})
export class ProductServiceService {

  constructor(private httpClient: HttpClient) {}

  public getCatalogue(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(environment.productsUrl);
  }

  public getCategories(): Observable<Array<Category>> {
    return this.httpClient.get<Array<Category>>(environment.categoriesUrl);
  }

  public getPeriods(): Observable<Array<Period>> {
    return this.httpClient.get<Array<Period>>(environment.periodesUrl);
  }

  public getCountries(): Observable<Array<Country>> {
    return this.httpClient.get<Array<Country>>(environment.paysUrl);
  }
}
