import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/authz/jwt.strategy';
import * as dotenv from 'dotenv'

dotenv.config()

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity]),
  JwtModule.register({
    secret:process.env.SECRET_KEY,
    // signOptions: { expiresIn: '1000h' },
  }),
],
  providers: [UserService,JwtStrategy],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
