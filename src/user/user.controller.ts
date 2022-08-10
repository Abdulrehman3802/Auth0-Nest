import { Controller, Get, Param, Post,Body, Delete, UseGuards } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

@Get()
async findAll(){
    const user = await this.userService.findAll()
    return user
}
@UseGuards(AuthGuard('jwt'))
@Get('/:id')
async find(@Param('id') id:number)
{
    const user = await this.userService.find(id)
    return user 
}

@Post()
async create(@Body() body:UserEntity){
    this.userService.create(body)
    return {
        message:`User created with name ${body.name}`
    }
}
@Post('/update/:id')
async update(@Param()id:number,@Body() body:UserEntity){
    this.userService.update(id,body)
}

@Delete(':id')
async delete (@Param() id:number){
    const user = await this.userService.find(id)
    if(!user){
        return{
            message:"Not Found"
        }
    }
    this.userService.delete(id)
    return{
        message: "User deleted"
    }
}

@Post('/signup')
async signup(@Body() body:UserEntity){
    this.userService.create(body)
    return {
        message:"Account created Successfuly"
    }
}

@Post('/login')
async login(@Body() body:UserEntity){
   
    return this.userService.login(body)
    
}
}
