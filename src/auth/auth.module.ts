import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 3600 * 24 * 7 + 's' }//有效时间
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy], //这里之前加了一个UserService困扰了老子一天！！！其实只要在imports里边导入UserModule就好了。
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
