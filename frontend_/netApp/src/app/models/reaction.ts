import { ReactionType } from "../profile-posts/profile-posts.service"
import { User } from "./user"


export class Reaction{

    id: string
    reaction: ReactionType
    created_at: Date
    user: User

}