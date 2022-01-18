import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddProduct, RemoveAllProducts, RemoveProduct } from '../actions/product-action';
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
    return (id_product: number) => {
      return state.products.filter(s => s.id_product === id_product).pop();
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

  @Action(RemoveAllProducts)
  removeAll(
    { getState, patchState }: StateContext<ProductStateModel>
  ) {
    const state = getState();
    patchState({
      products: [],
    });
  }
}
