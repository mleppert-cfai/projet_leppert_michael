import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { ProductState } from 'shared/states/product-state';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SearchEngineComponent } from './search-engine/search-engine.component';
import { ProductCardComponent } from './product-card/product-card.component';


const routes: Routes = [
  {
    path: 'product-list',
    component: ProductListComponent,
  },  
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
  },
  {
    path: ':ref',
    component: ProductDetailComponent,
  },
];

@NgModule({
  declarations: [
    ProductListComponent,
    SearchEngineComponent,
    ProductCardComponent,
    ShoppingCartComponent,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,    
    FormsModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([ProductState]),
    HttpClientModule,
  ]
})
export class ProductsModule { }
