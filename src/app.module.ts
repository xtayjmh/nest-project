import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoModule } from './demo/demo.module';
import { UploaderModule } from './uploader/uploader.module';

@Module({
  imports: [DemoModule, UploaderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
