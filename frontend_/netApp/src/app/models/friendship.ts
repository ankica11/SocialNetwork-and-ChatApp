import {User} from './user'

export class Friendship{
    friendsId: number
    senderFriendId: number
    receiverFriendId: number
    accepted: boolean
    created_at: Date
    updated_at: Date
    senderFriend: User | null
    receiverFriend: User | null

}