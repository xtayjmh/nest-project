import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { jwtConstants } from "./constants";
// jwt.strategy.ts文件定义默认使用JWT策略, 可以定义多种策略模式
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, //请求被拒绝默认返回401
            secretOrKey: jwtConstants.secret
        })
    }

    async valid(payload: any) {
        return { id: payload.sub, username: payload.username }
    }
}