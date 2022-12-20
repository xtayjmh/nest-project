import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from '../app.module';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor() {
        super();
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log('进入全局守卫');
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        /**
         * @如果白名单数组中存在路径
         */
        if (this.hasUrl(this.urlList, req.url)) return true;


        // 获取token
        const accessToken = req.get('Authorization');
        if (!accessToken) throw new UnauthorizedException('请先登录');
        // 获取id
        // @ts-ignore
        const app = await NestFactory.create<NestExpressApplication>(AppModule, {
            logger: true,
        });
        const authService = app.get(AuthService);
        const userService = app.get(UsersService);
        const user = await authService.verifyToken(accessToken);
        console.log(222222222, user);
        if (Object.keys(user).length > 0) {
            // const resData = await userService.userfindOne(user.sub);
            return true;
            // if (resData.code === 200) return true;
        }

    }
    // 白名单数组
    private urlList: string[] = ['/api/auth/login'];

    // 验证该次请求是否为白名单内的路由
    private hasUrl(urlList: string[], url: string): boolean {
        let flag = false;
        if (urlList.indexOf(url) !== -1) {
            flag = true;
        }
        console.log('11111', url, flag);
        return flag;
    }
}
