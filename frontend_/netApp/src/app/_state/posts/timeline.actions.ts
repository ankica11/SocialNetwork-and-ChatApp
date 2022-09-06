import { createAction, props } from "@ngrx/store";


export const getTimelinePosts = createAction(
    '[Homepage API] Get Timeline',
    props<{posts: any[]}>()
)

export const addPostToTimeline = createAction(
    '[Homepage API] Add Post',
    props<{newPost: any}>()
)

export const setTimelinePosts = createAction(
    '[Homepage API] Set Posts',
    props<{posts: any[]}>()
)