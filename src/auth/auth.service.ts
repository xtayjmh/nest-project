import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    /**
    * @token验证方法
    * @param token
    */
    async verifyToken(token: string): Promise<any> {

        try {
            if (!token) return false;
            const id = this.jwtService.verify(token.replace('Bearer ', ''));
            console.log(id);
            return id;
        } catch (e) {
            return false;
        }
    }
}