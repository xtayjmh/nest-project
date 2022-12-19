import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoModule } from './demo/demo.module';
import { UploaderModule } from './uploader/uploader.module';
import { MongooseModule } from "@nestjs/mongoose"; //引入数据库连接包
import { CatModule } from './cat/cat.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DemoModule, UploaderModule, CatModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    UserModule,
    AuthModule //创建数据库连接
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
