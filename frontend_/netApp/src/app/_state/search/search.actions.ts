import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user";
import { Status } from "../people/friends.status.reducer";




export const getSearchResults = createAction(
    '[Search API] Get Serach Results',
    props<{searchResults: {user:User, status: Status}[]}>()
)

