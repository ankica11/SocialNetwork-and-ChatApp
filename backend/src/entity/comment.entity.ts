import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";





@Entity()
export class Comment{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "text"
    })
    text: string

    @CreateDateColumn()
    created_at: Date

    @ManyToOne(()=>User, (user)=>user.comments)
    user: User

    @ManyToOne(()=>Post, (post)=>post.comments, {onDelete: 'CASCADE'})
    post: Post


}