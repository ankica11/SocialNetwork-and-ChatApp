import { User } from "./user"

export class Message{
    id: number
    senderId: number
    receiverId: number
    sender: User
    receiver: User
    text: string
    created_at: Date
}