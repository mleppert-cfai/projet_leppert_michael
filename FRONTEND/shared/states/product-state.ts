import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddProduct, RemoveProduct } from '../actions/product-action';
import { ProductStateModel } from './product-state-model';
@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: [],
  },
})
@Injectable()
export class ProductState {
  @Selector()
  static getNbProducts(state: ProductStateModel) {
    return state.products.length;
  }
  @Selector()
  static getListeProducts(state: ProductStateModel) {
    return state.products;
  }
  @Selector()
  static getProduct(state: ProductStateModel) {
    return (ref: string) => {
      return state.products.filter(s => s.ref === ref).pop();
    };
  }

  @Action(AddProduct)
  add(
    { getState, patchState }: StateContext<ProductStateModel>,
    { payload }: AddProduct
  ) {
    const state = getState();
    patchState({
      products: [...state.products, payload],
    });
  }

  @Action(RemoveProduct)
  remove(
    { getState, patchState }: StateContext<ProductStateModel>,
    { payload }: RemoveProduct
  ) {
    const state = getState();
    patchState({
      products: state.products.filter(item => item != payload),
    });
  }
}
