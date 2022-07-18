import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from './constants';
import { HttpException, HttpStatus } from "@nestjs/common";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: jwtConstants.secret
        })
    }

    async validate(payload: any) {
        if(payload.sub == '1234567890') {
            return {userId: payload.sub, username: payload.username}
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    }

}