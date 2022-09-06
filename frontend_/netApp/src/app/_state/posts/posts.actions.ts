import { createAction, props } from "@ngrx/store";

import { Post } from "src/app/models/post";


export const getUserPosts = createAction(
    '[Posts API] Get Posts',
    props<{posts: Post[]}>()
) 

export const addPost = createAction(
    '[Posts API] Add Post',
    props<{newPost: Post}>()
)

export const setUserPosts = createAction(
    '[Posts API] Set Posts',
    props<{posts: Post[]}>()
)