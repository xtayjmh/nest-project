import { Controller, Get, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { Response } from 'express';
import { UploaderService } from './uploader.service';
import { join } from 'path';

@Controller('uploader')
export class UploaderController {
  constructor(private readonly uploaderService: UploaderService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) //file就是前台上传文件是给的,就是postman里边的key
  upload(@UploadedFile() file) {
    console.log(file);
    return true;
  }

  @Get('download')
  download(@Res() res: Response) {
    const url = join(__dirname, '../images/1671281652420.jpg')
    res.download(url);
  }
}
