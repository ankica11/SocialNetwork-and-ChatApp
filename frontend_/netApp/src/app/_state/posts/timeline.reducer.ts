import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store"
import { addPostToTimeline, setTimelinePosts } from "./timeline.actions"



export interface TimelineState{
    timelinePosts: any[]
}

export const initialState: TimelineState = {
    timelinePosts: []
}

const getTimelineFeatureState = createFeatureSelector<TimelineState>('timeline')

export const selectTimeline = createSelector(
    getTimelineFeatureState,
    state=> state.timelinePosts
)

export const timelineReducer = createReducer(
    initialState,
    on(setTimelinePosts, (state, {posts})=>({timelinePosts: posts})),
    on(addPostToTimeline, (state, {newPost})=>({timelinePosts: [newPost, ...state.timelinePosts]}))
)