import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  //fecthing all user from database
  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  //Finding User from database
  find(id: number): Promise<UserEntity> {
    return this.userRepository.findOneById(id);
  }

  //creating User in my sql database
  async create(data: UserEntity) {

    //hashing password
    const password = await bcrypt.hash(data.password, 5); //hashing password
    data.password = password;
    try{
        return this.userRepository.save(data)
    }catch(error){
        if(error) return error
    }
  }

  //Deleting user from database
  delete(id: number) {
    return this.userRepository.delete(id);
  }

  async update(id:number,data:UserEntity){
    await  this.userRepository.update(id,data)
  }

  // Login User and Admin
  async login(data: UserEntity) {
    const email = data.email
    const user = await this.userRepository.findOneBy({email:email})  
    if(!user){
        return {
            message: "Invalid Email"
        }
    }
    return this.verifyPswrd(data.password, user);
  }

  // verfying password and assigning a token
  async verifyPswrd(password: string, data: UserEntity) {
    const valid_user = await bcrypt.compare(password, data.password);
    if (valid_user) {        
      if (data.role === 'admin') {        
        return {
            token: this.jwtService.sign(data.name),
            access: "ADMIN"
        }
      } 
      else {
        return {
          message: 'You have Limited access',
        };
      }
    } else {
      return {
        message: 'Invalid Password',
      };
    }
  }
}
