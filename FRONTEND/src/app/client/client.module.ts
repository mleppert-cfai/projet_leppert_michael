import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';

import { PhoneFormatPipe } from './phone-format.pipe';

import { ClientFormComponent } from './client-form/client-form.component';
import { ClientFormRecapComponent } from './client-form-recap/client-form-recap.component';


const routes: Routes = [
  {
    path: 'client-form',
    component: ClientFormComponent,
  },
];

@NgModule({
  declarations: [
    ClientFormComponent,
    ClientFormRecapComponent,
    PhoneFormatPipe,
  ],
  imports: [   
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ClientModule { }
