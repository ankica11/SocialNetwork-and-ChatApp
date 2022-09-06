import { Comment } from './comment'
import { Reaction } from './reaction'
import {User} from './user'

export class Post{
    id: number
    created_at: Date
    text: string
    photo: string 
    link: string
    audience: string
    user: User
    comments: Comment[]
    reactions: Reaction[]

    addToComment(comment){
        this.comments.push(comment)
    }

}