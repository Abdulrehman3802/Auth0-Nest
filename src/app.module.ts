import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthzModule } from './authz/authz.module';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'203802bsitprogramming',
    database:'auth',
    entities:[UserEntity],
    synchronize:true
  }),
  AuthzModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
