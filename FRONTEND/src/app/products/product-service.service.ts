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

  urlApiProducts = "/api/products/";
  urlApiCategories = "/api/categories/";
  urlApiCountries = "/api/countries/";
  urlApiPeriods = "/api/periods/";

  constructor(private httpClient: HttpClient, private api: ApiService) {}

  public getCatalogue() : Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(environment.baseApiUrl + this.urlApiProducts);
  }

  public getCategories() : Observable<Array<Category>> {
    return this.httpClient.get<Array<Category>>(environment.baseApiUrl + this.urlApiCategories);
  }

  public getCountries() : Observable<Array<Country>> {
    return this.httpClient.get<Array<Country>>(environment.baseApiUrl + this.urlApiCountries);
  }

  public getPeriods() : Observable<Array<Period>> {
    return this.httpClient.get<Array<Period>>(environment.baseApiUrl + this.urlApiPeriods);
  }
}
