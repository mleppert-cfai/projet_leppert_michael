import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../category';
import { Period } from '../period';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.scss']
})
export class SearchEngineComponent implements OnInit {

  constructor(private productService: ProductServiceService) { }

  categories$!: Observable<Array<Category>>;
  periods$!: Observable<Array<Period>>;
  
  observerCategories: any;
  observerPeriods: any;

  @Input() filterCategorie: string = "";
  @Input() filterPeriode: string = "";

  ngOnInit(): void {
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
    this.observerPeriods = this.categories$.subscribe(
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
    if (this.observerCategories) {
      this.observerCategories.unsubscribe();
    }
    if (this.observerPeriods) {
      this.observerPeriods.unsubscribe();
    }
  }

  onApplyFilter() {
    
  }

}
