import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";

import { User } from "src/app/models/user";
import { addFriend, getSentRequests, getSentRequestsFailure, getSentRequestsSuccess } from "./people.actions";


export interface Poeplestate{
    sentRequests: User[],
    error: string,
    status: 'pending' | 'loading' | 'error' | 'success'
    
}







export const initialState = []

export const PeopleReducer = createReducer(
    initialState,

    on(addFriend, (state, {user})=>(
       [...state, user]
    )),

    on(getSentRequests, (state, {userId}) => ({ ...state, status: 'loading' })),

    on(getSentRequestsSuccess, (state, {sentReqs}) => sentReqs),

    on(getSentRequestsFailure, (state, {error})=>({
        ...state,
       
    })),
  
)