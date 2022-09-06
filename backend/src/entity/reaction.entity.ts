import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";

export enum ReactionType {
    LIKE = 0,
    HEART = 1,
    LAUGH = 2,
    CRY = 3,
    ANGRY = 4,
    NEUTRAL = 5,
    BORING = 6,
    WOW = 7,
    MIDDLE_FINGER = 8,
    NONE = 9
}

@Entity()
export class Reaction{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "enum",
        enum: ReactionType,
        default: ReactionType.NONE,
    })
    reaction: ReactionType

    @CreateDateColumn()
    created_at: Date

    @ManyToOne(()=>User, (user)=>user.reactions)
    user: User

    @ManyToOne(()=>Post, (post)=>post.reactions, {onDelete: 'CASCADE'})
    post: Post

}