import { createAction, props } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { Status } from "./friends.status.reducer";




export const setFriendsStatus = createAction(
    '[People API] Set friends status',
    props<{status: Status}>()
)