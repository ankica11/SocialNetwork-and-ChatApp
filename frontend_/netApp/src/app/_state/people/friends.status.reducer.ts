import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store"
import { setFriendsStatus } from "./friends.status.actions"

export enum Status{
    FRIENDS,
    PENDING_SENT,
    PENDING_RECEIVED,
    NONE
}

export interface FriendsStatusState{
    status: Status
}

export const initialState: FriendsStatusState = {
    status: Status.NONE
}

const getFriendsStatusFeatureState = createFeatureSelector<FriendsStatusState>('friendsStatus')

export const selectFriendsStatus = createSelector(
    getFriendsStatusFeatureState,
    state => state.status
)

export const setFriendsStatusReducer = createReducer(
    initialState,
    on(setFriendsStatus, (state, {status}) => ({status: status}))
)