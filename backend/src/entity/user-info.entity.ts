import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class UserInfo{

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: true
    })
    phone: string

    @Column({
        nullable: true
    })
    email: string

    @Column({
        nullable: true
    })
    workplace: string

    @Column({
        nullable: true
    })
    college: string

    @Column({
        nullable: true
    })
    highSchool: string

    @Column({
        nullable: true
    })
    currentPlace:string

    @Column({
        nullable: true
    })
    hometown: string

    @Column({
        nullable: true
    })
    relationshipStatus: string

    @Column({
        nullable: true
    })
    gender: string

    @Column({
        nullable: true
    })
    interestedIn: string

    @Column({
        nullable: true
    })
    birthDate: Date

    @Column({
        nullable: true
    })
    language: string

    @Column({
        nullable: true
    })
    about: string

    @Column({
        nullable: true
    })
    nickname: string

    @Column({
        nullable: true
    })
    favQuotes: string

    @Column("simple-json", {
       nullable: true
    })
    socialLinks: {instagram: string, facebook: string, twitter: string, tiktok: string, pinterest: string, youtube: string, snapchat: string}

    @Column("simple-array", {
        nullable: true
    })
    website: string[]

    @OneToOne(()=>User, (user) => user.user_info)
    user:User
}