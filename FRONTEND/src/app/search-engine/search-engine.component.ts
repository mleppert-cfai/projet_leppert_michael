import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../categorie';
import { Periode } from '../periode';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.scss']
})
export class SearchEngineComponent implements OnInit {

  constructor(private productService: ProductServiceService) { }

  categories$!: Observable<Array<Categorie>>;
  periodes$!: Observable<Array<Periode>>;
  
  observerCategories: any;
  observerPeriodes: any;

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

    this.periodes$ = this.productService.getPeriodes();
    
    if (this.observerPeriodes) {
      this.observerPeriodes.unsubscribe();
    }
    this.observerPeriodes = this.categories$.subscribe(
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
    if (this.observerPeriodes) {
      this.observerPeriodes.unsubscribe();
    }
  }

  onApplyFilter() {
    
  }

}
