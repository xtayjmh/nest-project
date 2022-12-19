import { Controller, Get, UseGuards, Request, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '../local-auth/local-auth.guard';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    /**
     * @通过UseGuards装饰器引用本地策略拿到返回的用户
     * @返回token
     * @param req
     */
    @ApiTags('用户登录')
    // @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Body() req) {
        console.log(req.user);

        return this.authService.login(req.user);
    }

    /**
     * @验证登录信息:通过token解析出用户id用户名
     * @param req
     */
    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}