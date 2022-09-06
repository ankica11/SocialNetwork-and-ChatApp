import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { User } from "src/app/models/user";
import { StorageService } from "src/app/_services/storage.service";
import { Status } from "../people/friends.status.reducer";
import { getSearchResults } from "./search.actions";


export interface SearchResultsState{
    searchResults: {user: User, status: Status}[]
}

export const initialState: SearchResultsState = {
    searchResults: []
}

const getSearchResultsFeatureState = createFeatureSelector<SearchResultsState>('searchResults')

export const selectSearchResults = createSelector(
    getSearchResultsFeatureState,
    state => state.searchResults
)



export const searchResultsReducer = createReducer(
    initialState,
    on(getSearchResults, (state, {searchResults})=>({searchResults: searchResults})),
    
    
)

