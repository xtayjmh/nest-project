import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoModule } from './demo/demo.module';
import { UploaderModule } from './uploader/uploader.module';
import { MongooseModule } from "@nestjs/mongoose"; //引入数据库连接包
import { CatModule } from './cat/cat.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DemoModule, UploaderModule, CatModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    AuthModule,
    UsersModule,
    UserModule //创建数据库连接
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
