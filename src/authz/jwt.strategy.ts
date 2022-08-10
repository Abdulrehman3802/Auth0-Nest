import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt,Strategy} from 'passport-jwt';
import { passportJwtSecret } from "jwks-rsa";
import * as dotenv from 'dotenv';


dotenv.config();
// console.log(process.env.SECRET_KEY);

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){    // defining jwt strategy for authguard   
    constructor(){
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${process.env.AUTH0_ISUUER_URL}.wellknown/jwks.json`,
            }),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audiance: process.env.AUTH0_AUDIENCE,
            issuer:`${process.env.AUTH0_ISUUER_URL}`,
            algorithms:['RS256'],
            secretOrKeyProvideer:process.env.SECRET_KEY,
        })
    }

    validate(payload:unknown):unknown{
        return payload
    }

}