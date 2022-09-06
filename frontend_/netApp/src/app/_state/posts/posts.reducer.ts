import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Post } from "src/app/models/post";
import { addPost, getUserPosts } from "./posts.actions";


export interface PostState{
    userPosts: Post[]
}

export const initialState: PostState = {
    userPosts: []
}

const getPostsFeatureState = createFeatureSelector<PostState>('posts')

export const selectUserPosts = createSelector(
    getPostsFeatureState,
    state => state.userPosts
)

export const postsReducer = createReducer(
    initialState,
    on(getUserPosts, (state, {posts})=>({userPosts : posts})),
    on(addPost, (state, {newPost})=>({userPosts: [newPost, ...state.userPosts]}))
    
   

)