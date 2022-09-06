import { createAction, props } from "@ngrx/store"
import { User } from "src/app/models/user"



export const setFriendRequests = createAction('[People Page] Set Friend Requests',
props<{friendReqs: User[]}>())

export const confirmFriendRequest = createAction('[People Page] Confirm Friend Requests',
props<{friendReq: User}>())

export const deleteFriendRequest = createAction('[People Page] Delete Friend Request',
props<{friendReq: User}>())