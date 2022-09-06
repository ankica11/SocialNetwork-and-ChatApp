import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";



@Entity()
export class UserSession{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    refreshToken: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column()
    expires_at: Date

    @Column({
        nullable: true
    })
    user_agent: string

    @Column({
        nullable: true
    })
    location: string

    @Column({
        default: "valid"
    })
    status: string

    @Column({
        default: false
    })
    online: boolean

    @Column({
        type: "timestamp",
        nullable: true
    })
    lastAccessedAt: Date

    
    @OneToOne(() => User, (user) => user.user_session)
    user: User
}