import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user";


export const addFriend = createAction(
    '[People Page] Add Friend',
     props<{user: User}>()
)

export const getSentRequests = createAction('[People Page] Get Sent Requests',
props<{userId: number}>())

export const getSentRequestsSuccess = createAction(

    '[People API] Get Sent Requests Success',
    props<{ sentReqs: User[] }>(
    
    )

  );

export const getSentRequestsFailure = createAction(
    '[People API] Get Sent Requests Failure',
    props<{ error: string }>()
  );


