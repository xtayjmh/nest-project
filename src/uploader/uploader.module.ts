import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { UploaderController } from './uploader.controller';
import { diskStorage } from "multer";
import { MulterModule } from '@nestjs/platform-express';
import { extname, join } from 'path'

@Module({
  imports: [MulterModule.register({
    storage: diskStorage({
      destination: join(__dirname, "../images"),
      filename: (_, file, callback) => {
        const fileName = `${new Date().getTime() + extname(file.originalname)}`; //时间戳重命名文件
        return callback(null, fileName);
      }
    })
  })],
  controllers: [UploaderController],
  providers: [UploaderService]
})
export class UploaderModule { }
