import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() body) {
        return this.authService.login(body)
    }

    @Post('profile')
    @UseGuards(JwtAuthGuard)
    async profile(@Body() body) {
        return body;
    }
}
