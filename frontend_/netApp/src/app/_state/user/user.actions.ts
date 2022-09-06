import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user";



export const setSelectedUser = createAction(
    '[User API] Set selected user',
    props<{selectedUser: User, myProfileMode: boolean}>()
)