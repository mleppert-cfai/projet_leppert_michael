import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../../../shared/models/product';
import { Category } from './category';
import { Period } from './period';
import { Country } from './country';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'any'
})
export class ProductServiceService {

  constructor(private httpClient: HttpClient, private api: ApiService) {}

  public getCatalogue(): Observable<Array<Product>> {
    return this.api.getProducts();
    //return this.httpClient.get<Array<Product>>(environment.productsUrl);
  }

  public getCategories(): Observable<Array<Category>> {
    return this.api.getCategories();
    //return this.httpClient.get<Array<Category>>(environment.categoriesUrl);
  }

  public getPeriods(): Observable<Array<Period>> {
    return this.api.getPeriods();
    //return this.httpClient.get<Array<Period>>(environment.periodesUrl);
  }

  public getCountries(): Observable<Array<Country>> {
    return this.api.getCountries();
    //return this.httpClient.get<Array<Country>>(environment.paysUrl);
  }
}
