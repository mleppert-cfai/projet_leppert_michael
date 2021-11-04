import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientFormRecapComponent } from './client-form-recap/client-form-recap.component';
import { PhoneFormatPipe } from './phone-format.pipe';
import { InvalidInputDirective } from './invalid-input.directive';
import { ProductListComponent } from './product-list/product-list.component';
import { SearchEngineComponent } from './search-engine/search-engine.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductState } from 'shared/states/product-state';

const appRoutes: Routes = [
  {
    path: 'client-form',
    component: ClientFormComponent,
  },
  {
    path: 'product-list',
    component: ProductListComponent,
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
  },
  {
    path: '',
    redirectTo: '/client-form',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientFormComponent,
    ClientFormRecapComponent,
    PhoneFormatPipe,
    InvalidInputDirective,
    ProductListComponent,
    SearchEngineComponent,
    NavBarComponent,
    PageNotFoundComponent,
    ProductCardComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgxsModule.forRoot([ProductState]),
    RouterModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
