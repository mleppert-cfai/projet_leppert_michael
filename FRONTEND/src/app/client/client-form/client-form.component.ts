import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  constructor() { }

  hideRecap : boolean = true;
  
  name : string = "";
  surname : string = "";
  civilite : string = "";
  address : string = "";
  city : string = "";
  zipCode : string = "";
  country : string = "";
  email : string = "";
  phone : string = "";
  login : string = "";
  password : string = "";
  confirmPassword : string = "";

  validForm : boolean = true;
  validName : boolean = true;
  validSurname : boolean = true;
  validCivilite : boolean = true;
  validAddress : boolean = true;
  validCity : boolean = true;
  validZipCode : boolean = true;
  validCountry : boolean = true;
  validEmail : boolean = true;
  validPhone : boolean = true;
  validLogin : boolean = true;
  validPassword : boolean = true;
  validConfirmPassword : boolean = true;

  regexNameSurnameCity : RegExp = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\-]+$");
  regexAddress : RegExp = new RegExp("^[0-9]{1,3}[\\s].[\\sA-Za-zÀ-ÖØ-öø-ÿ\-\']+$");
  regexZipCode : RegExp = new RegExp("^[0-9]{5}$");
  regexEmail : RegExp = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\-\.]+@[A-Za-zÀ-ÖØ-öø-ÿ\-\.]+[\.].[A-Za-z]+$");
  regexPhone : RegExp = new RegExp("^([0-9]{2}){5}$");
  regexLogin : RegExp = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ0-9]+$");
  regexPassword : RegExp = new RegExp("^[\\S]+$");

  onSubmit() : void {
    this.validName = this.validateInput(this.name, this.regexNameSurnameCity);
    this.validSurname = this.validateInput(this.surname, this.regexNameSurnameCity);
    this.validCivilite = this.validateDropDownSelection(this.civilite);
    this.validAddress = this.validateInput(this.address, this.regexAddress);
    this.validCity = this.validateInput(this.city, this.regexNameSurnameCity);
    this.validZipCode = this.validateInput(this.zipCode, this.regexZipCode);
    this.validCountry = this.validateDropDownSelection(this.country);
    this.validEmail = this.validateInput(this.email, this.regexEmail);
    this.validPhone = this.validateInput(this.phone, this.regexPhone);
    this.validLogin = this.validateInput(this.login, this.regexLogin);
    this.validPassword = this.validateInput(this.password, this.regexPassword);
    this.validConfirmPassword = this.validatePasswordMatch(this.password, this.confirmPassword);
    this.hideRecap = false;
  }

  ngOnInit(): void {
  }

  validateInput(input : string, regex : RegExp) : boolean {
    if(! regex.test(input)) {
      return false;
    }
    else {
      return true;
    }
  }

  validateDropDownSelection(selection : string) : boolean {
    if(selection == "") {
      return false;
    }
    else {
      return true;
    }    
  }

  validatePasswordMatch(passwordInput : string, confirmPasswordInput : string) : boolean {
    if(passwordInput != confirmPasswordInput) {
      return false;
    }
    else {
      return true;
    }
  }

}
