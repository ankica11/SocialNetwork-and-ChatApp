import { state } from '@angular/animations';
import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { login, logout } from './auth.actions';


export interface State {
  loggedUser: User,
  loggedIn: boolean
}

export const initialState: State = {
  loggedUser: null,
  loggedIn: false
};

const getAuthFeatureState = createFeatureSelector<State>('user');

export const selectLoggedUser = createSelector(
  getAuthFeatureState,
  state => state.loggedUser
);

export const selectIsLogged = createSelector(
  getAuthFeatureState,
  state => state.loggedIn
);


export const authReducer = createReducer(
  initialState,
  on(login, (state, {user})=> ({loggedUser: user, loggedIn: true})),
  on(logout, (state) => ({loggedUser: null, loggedIn: false}))
);

