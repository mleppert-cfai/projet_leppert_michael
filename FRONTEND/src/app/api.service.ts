import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './models/user';

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
  tokenParse : String = "";

  constructor(private httpClient : HttpClient) { }

  public postLogin(login : String, password : String): Observable<User> {
    let data : String;
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
      data = "login=" + login + 
      "&password=" + password;
      return this.httpClient.post<User>(environment.baseApiUrl + this.urlApiLogin, data, httpOptions);
  }

  public getLogin(login : String) : Observable<User> {
    let data : String;
    data = "login=" + login;
    console.log(data);

    return this.httpClient.get<User>(environment.baseApiUrl + this.urlApiLogin + login);
  } 

  public postRegister(firstname : String, lastname : String, civility : String, address : String, city : String, zip : String, country : String, email : String, phone : String, login : String, password : String): Observable<User> {
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
      return this.httpClient.post<User>(environment.baseApiUrl + this.urlApiRegister, data, httpOptions);
  }

  public getProducts() : Observable<User> {
    return this.httpClient.get<User>(environment.baseApiUrl + this.urlApiLogin);
  } 
  
}
