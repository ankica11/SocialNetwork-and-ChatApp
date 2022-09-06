
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Message{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    senderId: number

    @Column()
    receiverId: number

    @ManyToOne(()=>User, (sender)=>sender.sentMessages)
    sender: User

    @ManyToOne(()=>User, (receiver)=>receiver.receivedMessages)
    receiver: User

    @Column({
        type: "text"
    })
    text: string

    @CreateDateColumn()
    created_at: Date

}
