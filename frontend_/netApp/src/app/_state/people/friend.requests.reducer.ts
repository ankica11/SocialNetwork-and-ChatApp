import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";

import { User } from "src/app/models/user";
import { confirmFriendRequest, setFriendRequests } from "./friend.requests.actions";



export interface FriendRequestsState{
    friendRequests: any[]
}


export const initialState: FriendRequestsState = {
    friendRequests: []
}


const friendRequestsFeatureState = createFeatureSelector<FriendRequestsState>('friendRequests')

export const selectFriendRequests = createSelector(
    friendRequestsFeatureState,
    state => state.friendRequests
)

export const friendRequestsReducer = createReducer(
    initialState,
   
    on(setFriendRequests, (state, {friendReqs})=>({friendRequests: friendReqs}))
)