import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { ProductState } from 'shared/states/product-state';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  @Select(ProductState.getNbProducts) nbProducts!: number;

  ngOnInit(): void {
  }

}
