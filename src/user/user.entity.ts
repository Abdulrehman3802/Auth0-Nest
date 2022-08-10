import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import {IsEmail, IsString } from 'class-validator'

@Entity({name:'auth0'})
@Unique(["email"])
export class UserEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
   
  @IsString() name:string

    @Column()
    password: string

    @IsEmail()
    @Column()
     email:string 

     
    @Column({default:'user'})
     role:string 
     
}