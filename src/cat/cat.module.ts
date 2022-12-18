import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CatSchema } from './cat.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Cat", schema: CatSchema }])],
  controllers: [CatController],
  providers: [CatService]
})
export class CatModule { }
