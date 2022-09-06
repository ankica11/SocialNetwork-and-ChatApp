import { ReadableByteStreamController } from "node:stream/web";
import { type } from "os";
import { BaseEntity, Column, CreateDateColumn, Entity, IsNull, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { Reaction } from "./reaction.entity";
import { User } from "./user.entity";


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
export class Post{

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "text"
    })
    text: string

    @Column({
        nullable: true
    })
    photo: string   
    
    @Column({
        nullable: true
    })
    link: string


    @CreateDateColumn()
    created_at: Date

    @Column({
        default: 'public'
    })
    audience: string

    @ManyToOne(()=>User, (user)=>user.posts)
    user: User

    @OneToMany(()=>Comment, (comment)=>comment.post)
    comments: Comment[]

    @OneToMany(()=>Reaction, (reactions)=>reactions.post)
    reactions: Reaction[]


    
}