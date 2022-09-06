import { ReadableByteStreamController } from "node:stream/web";
import { type } from "os";
import { BaseEntity, Column, CreateDateColumn, Entity, IsNull, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { Friends } from "./friends.entity";
import { Message } from "./message.entity";
import { Post } from "./post.entity";
import { Reaction } from "./reaction.entity";
import { UserSession } from "./session.entity";
import { UserInfo } from "./user-info.entity";

export enum UserRole {
    ADMIN = "admin",
    MODERATOR = "moderator",
    USER = "user"
}
//active record extends BaseEntity and we don't need repository or menager
//to execute typeorm functions and we can define statis function inside 
//our entity class
//data mapper - entities are just models and doesn't contain any logic
@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string    //change this cuz we want to store password hashes in db not clear password
    
    @Column({
        nullable: true
    })
    name: string

    @Column({
        nullable: true
    })
    phone: string        //needs to be formatted like 060/3533853 or +381603533853

    @Column({
        nullable: true
    })
    email: string       //needs to be formatted

    @Column({
        default: true
    })
    isActive: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column({
        default: "http://localhost:3000/api/user_about/files/user.jpg"
    })
    avatar: String

    @Column({
        nullable: true
    })
    background_photo: string

    @Column({
        type: "set",
        enum: UserRole,
        default: [UserRole.USER]
    })
    roles: UserRole[]

    @OneToOne(() => UserSession, (user_session) => user_session.user, 
              {cascade: true, onDelete: 'SET NULL'})
    @JoinColumn()
    user_session: UserSession

    @OneToOne(()=> UserInfo, (user_info)=> user_info.user,
              {cascade: true})
    @JoinColumn()
    user_info: UserInfo

    @OneToMany(()=>Friends, senderFriend => senderFriend.senderFriend)
    public senderFriends!: Friends[]

    @OneToMany(()=>Friends, receiverFriend => receiverFriend.receiverFriend)
    public receiverFriends!: Friends[]

    @OneToMany(()=>Post, (post)=>post.user)
    posts: Post[]

    @OneToMany(()=>Comment, (comment)=>comment.user)
    comments: Comment[]

    @OneToMany(()=>Reaction, (reactions)=>reactions.user)
    reactions: Reaction[]

    @OneToMany(()=>Message, (sentMessages)=>sentMessages.sender)
    sentMessages: Message[]

    @OneToMany(()=>Message, (receivedMessages)=>receivedMessages.receiver)
    receivedMessages: Message[]

    
}