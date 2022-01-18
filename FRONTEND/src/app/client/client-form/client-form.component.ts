import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  constructor(private fb : FormBuilder, private api: ApiService, private router : Router) { }

  registerForm !: FormGroup;
  submitted : boolean = false;
  errorMsg : String = '';
  successMsg : String = '';

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern("^[A-Za-zÀ-ÖØ-öø-ÿ\-]+$")]],
      lastname: ['', [Validators.required, Validators.pattern("^[A-Za-zÀ-ÖØ-öø-ÿ\-]+$")]],
      civility: ['', Validators.required],
      address: ['', [Validators.required, Validators.pattern("^[0-9]{1,3}[\\s].[\\sA-Za-zÀ-ÖØ-öø-ÿ\-\']+$")]],
      city: ['', [Validators.required, Validators.pattern("^[A-Za-zÀ-ÖØ-öø-ÿ\-]+$")]],
      zip: ['', [Validators.required, Validators.pattern("^[0-9]{5}$")]],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[A-Za-zÀ-ÖØ-öø-ÿ0-9\-\.]+@[A-Za-zÀ-ÖØ-öø-ÿ\-\.]+[\.].[A-Za-z]+$")]],
      phone: ['', [Validators.required, Validators.pattern("^([0-9]{2}){5}$")]],
      login: ['', [Validators.required, Validators.pattern("^[A-Za-zÀ-ÖØ-öø-ÿ0-9]+$")]],
      password: ['', [Validators.required, Validators.pattern("^[\\S]+$")]],
      confirmPassword: ['', [Validators.required, Validators.pattern("^[\\S]+$")]]
    },
    {validator: this.passwordMatchValidator}
    );
  }

  onSubmit() : void {
    if(this.registerForm.valid) {
      this.api.postRegister(this.registerForm.controls.firstname.value,
        this.registerForm.controls.lastname.value,
        this.registerForm.controls.civility.value,
        this.registerForm.controls.address.value,
        this.registerForm.controls.city.value,
        this.registerForm.controls.zip.value,
        this.registerForm.controls.country.value,
        this.registerForm.controls.email.value,
        this.registerForm.controls.phone.value,
        this.registerForm.controls.login.value,
        this.registerForm.controls.password.value).subscribe(
          event => {            
            console.log(event);
            //this.router.navigate(['/login']);
            this.successMsg = 'Votre compte a bien été crée !'
            this.errorMsg = '';
          },
          error => {
            console.log(error);
            this.successMsg= '';
            this.errorMsg = error.error.ERROR;
          }
          );
    }
    else {
      this.submitted = true;
    }
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirmPassword'].value ? null : {'mismatch': true};
  }
}
