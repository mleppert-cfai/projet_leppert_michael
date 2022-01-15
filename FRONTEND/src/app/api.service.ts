import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'shared/models/product';
import { environment } from 'src/environments/environment';
import { Client } from '../../shared/models/client';
import { Category } from './products/category';
import { Country } from './products/country';
import { Period } from './products/period';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  urlApiLogin = "/api/login/";
  urlApiRegister = "/api/register/";
  urlApiProducts = "/api/products/";
  urlApiCategories = "/api/categories/";
  urlApiCountries = "/api/countries/";
  urlApiPeriods = "/api/periods/";
  urlApiBuy = "/api/buy/";
  urlApiOrderHistory = "/api/orderhistory/";
  tokenParse : String = "";

  constructor(private httpClient : HttpClient) { }

  public postLogin(login : String, password : String): Observable<Client> {
    let data : String;
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
      data = "login=" + login + 
      "&password=" + password;
      return this.httpClient.post<Client>(environment.baseApiUrl + this.urlApiLogin, data, httpOptions);
  }

  public getLogin(login : String) : Observable<Client> {
    let data : String;
    data = "login=" + login;
    console.log(data);

    return this.httpClient.get<Client>(environment.baseApiUrl + this.urlApiLogin + login);
  } 

  public postRegister(firstname : String, lastname : String, civility : String, address : String, city : String, zip : String, country : String, email : String, phone : String, login : String, password : String): Observable<Client> {
    let data : String;
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
      data = "firstname=" + firstname +
      "&lastname=" + lastname +
      "&civility=" + civility +
      "&address=" + address +
      "&city=" + city +
      "&zip=" + zip +
      "&country=" + country +
      "&email=" + email +
      "&phone=" + phone +
      "&login=" + login +
      "&password=" + password;
      return this.httpClient.post<Client>(environment.baseApiUrl + this.urlApiRegister, data, httpOptions);
  }

  public getProducts() : Observable<Array<Product>> {
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

  public postBuy(id_client : number, id_product : Array<number>): Observable<any> {
    let data : String;
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
      data = "id_client=" + id_client + 
      "&id_product=" + id_product;
      return this.httpClient.post<any>(environment.baseApiUrl + this.urlApiBuy, data, httpOptions);
  }

  public getOrderHistory(id_client : number): Observable<Product> {
    let data : String;
    data = "id_client=" + id_client;
    return this.httpClient.get<Product>(environment.baseApiUrl + this.urlApiOrderHistory + id_client);
  }
  
}
