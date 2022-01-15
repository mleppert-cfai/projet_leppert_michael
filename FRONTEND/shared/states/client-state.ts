import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Client } from 'shared/models/client';
import { AddClient, AddJwtToken, RemoveClient, RemoveJwtToken } from '../actions/client-action';
import { ClientStateModel } from './client-state-model';
@State<ClientStateModel>({
  name: 'client',
  defaults: {
    client: null!,
    jwtToken: "",
  },
})
@Injectable()
export class ClientState {

  @Selector()
  static getClient(state: ClientStateModel) {
    return state.client;
  }
  @Selector()
  static getJwtToken(state: ClientStateModel) {
    return state.jwtToken;
  }

  @Action(AddClient)
  addClient(
    { getState, patchState }: StateContext<ClientStateModel>,
    { payload }: AddClient
  ) {
    const state = getState();
    patchState({
      client: payload,
    });
  }

  @Action(RemoveClient)
  removeClient(
    { getState, patchState }: StateContext<ClientStateModel>
  ) {
    const state = getState();
    patchState({
      client: null!,
    });
  }

  @Action(AddJwtToken)
  addJwtToken(
    { getState, patchState }: StateContext<ClientStateModel>,
    { payload }: AddJwtToken
  ) {
    const state = getState();
    patchState({
      jwtToken: payload,
    });
  }

  @Action(RemoveJwtToken)
  removeJwtToken(
    { getState, patchState }: StateContext<ClientStateModel>
  ) {
    const state = getState();
    patchState({
      jwtToken: "",
    });
  }
}
