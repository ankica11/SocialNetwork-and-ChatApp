import { Post } from "./post"
import { UserInfo } from "./user-info"
import { UserSession } from "./userSession"


export class User{
    id: number
    username: string
    password: string
    name: string
    phone: string
    email: string
    isActive: boolean
    created_at: Date
    updated_at: Date
    avatar: string
    background_photo: string
    roles: string[]
    user_info: UserInfo
    user_session: UserSession
    posts: Post[]
    senderFriends: User[] 
    receiverFriends: User[]
}