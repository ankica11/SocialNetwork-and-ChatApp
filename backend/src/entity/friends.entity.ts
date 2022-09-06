import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";


@Entity()
@Unique('friends_constraint', ["senderFriendId", "receiverFriendId"])
export class Friends{

    @PrimaryGeneratedColumn()
    public friendsId!: number

    @Column()
    public senderFriendId!: number

    @Column()
    public receiverFriendId!: number

    @Column({
        default: false
    })
    public accepted?: boolean

    //when request is sent
    @CreateDateColumn()
    created_at: Date

    //when requests is accepted and friendship is made
    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(()=>User, (senderFriend)=>senderFriend.senderFriends,
    {cascade: true})
    public senderFriend!:User

    @ManyToOne(()=>User, (receiverFriend)=>receiverFriend.receiverFriends,
    {cascade: true})
    public receiverFriend!:User





}