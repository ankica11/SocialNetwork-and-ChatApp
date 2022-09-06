import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { User } from "src/app/models/user";
import { setSelectedUser } from "./user.actions";


export interface SelectUserState{
    selectedUser: User,
    myProfileMode: boolean
}


export const initialState: SelectUserState = {
    selectedUser: null,
    myProfileMode: false
}

const getSelectUserFeatureState = createFeatureSelector<SelectUserState>('selectUser')

export const selectUser = createSelector(
    getSelectUserFeatureState,
    state => state.selectedUser
)

export const selectMyProfileMode = createSelector(
    getSelectUserFeatureState,
    state => state.myProfileMode
)

export const setSelectedUserReducer = createReducer(
    initialState,
    on(setSelectedUser, (state, {selectedUser, myProfileMode}) => ({selectedUser: selectedUser, myProfileMode: myProfileMode}))
)