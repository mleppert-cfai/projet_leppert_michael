import { Component, Input, OnInit } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { Category } from '../category';
import { Product } from '../../../../shared/models/product';
import { ProductServiceService } from '../product-service.service';
import { map } from 'rxjs/operators';
import { Period } from '../period';
import { Country } from '../country';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductServiceService) { }

  catalogue$!: Observable<Array<Product>>;
  categories$!: Observable<Array<Category>>;
  periods$!: Observable<Array<Period>>;
  countries$!: Observable<Array<Country>>;

  @Input() filterCategory: string = "";
  @Input() filterPeriod: string = "";
  @Input() filterCountry: string = "";
  
  observerCatalogue: any;
  observerCategories: any;
  observerPeriods: any;
  observerPays: any;

  ngOnInit(): void {
    this.catalogue$ = this.productService.getCatalogue();
    
    if (this.observerCatalogue) {
      this.observerCatalogue.unsubscribe();
    }
    this.observerCatalogue = this.catalogue$.subscribe(
      (value) => {
        console.log(value);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('Fini');
      }
    );

    this.categories$ = this.productService.getCategories();
    
    if (this.observerCategories) {
      this.observerCategories.unsubscribe();
    }
    this.observerCategories = this.categories$.subscribe(
      (value) => {
        console.log(value);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('Fini');
      }
    );

    this.periods$ = this.productService.getPeriods();
    
    if (this.observerPeriods) {
      this.observerPeriods.unsubscribe();
    }
    this.observerPeriods = this.periods$.subscribe(
      (value) => {
        console.log(value);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('Fini');
      }
    );

    this.countries$ = this.productService.getCountries();
    
    if (this.observerPays) {
      this.observerPays.unsubscribe();
    }
    this.observerPays = this.countries$.subscribe(
      (value) => {
        console.log(value);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('Fini');
      }
    );
  }

  ngOnDestroy() {
    if (this.observerCatalogue) {
      this.observerCatalogue.unsubscribe();
    }
    if (this.observerCategories) {
      this.observerCategories.unsubscribe();
    }
    if (this.observerPeriods) {
      this.observerPeriods.unsubscribe();
    }
    if (this.observerPays) {
      this.observerPays.unsubscribe();
    }
  }

  onApplyFilter() {
    if(this.filterCategory != "" && this.filterPeriod != "" && this.filterCountry != ""){
      this.catalogue$ = this.productService.getCatalogue().pipe(map(products => products.filter(prod => (prod.fk_category === this.filterCategory && prod.fk_period === this.filterPeriod && prod.fk_country === this.filterCountry))));
    }

    else if(this.filterCategory != "" && this.filterPeriod != ""){
      this.catalogue$ = this.productService.getCatalogue().pipe(map(products => products.filter(prod => (prod.fk_category === this.filterCategory && prod.fk_period === this.filterPeriod))));
    }
    else if(this.filterCategory != "" && this.filterCountry != ""){
      this.catalogue$ = this.productService.getCatalogue().pipe(map(products => products.filter(prod => (prod.fk_category === this.filterCategory && prod.fk_country === this.filterCountry))));
    }

    else if(this.filterPeriod != "" && this.filterCountry != ""){
      this.catalogue$ = this.productService.getCatalogue().pipe(map(products => products.filter(prod => (prod.fk_period === this.filterPeriod && prod.fk_country === this.filterCountry))));
    }
    
    else if(this.filterCategory != ""){
      this.catalogue$ = this.productService.getCatalogue().pipe(map(products => products.filter(prod => prod.fk_category === this.filterCategory)));
    }
    else if(this.filterPeriod != ""){
      this.catalogue$ = this.productService.getCatalogue().pipe(map(products => products.filter(prod => prod.fk_period === this.filterPeriod)));
    }
    else if(this.filterCountry != ""){
      this.catalogue$ = this.productService.getCatalogue().pipe(map(products => products.filter(prod => prod.fk_country === this.filterCountry)));
    }

    else{
      this.catalogue$ = this.productService.getCatalogue();
    }
  }

}
