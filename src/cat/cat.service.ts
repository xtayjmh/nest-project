import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatDocument, Cat } from './cat.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CatService {
  constructor(@InjectModel("Cat") private catRep: Model<Cat>) { }
  async create(createCatDto: CreateCatDto) {
    const createdCat = new this.catRep(createCatDto);
    const saved = await createdCat.save();
    return saved;
  }

  async findAll(): Promise<Cat[]> {
    const cats = await this.catRep.find().exec();
    return cats;
  }

  async findOne(name: number): Promise<Cat> {
    const cat = await this.catRep.findOne({ name: name });
    return cat;
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    const cat = await this.catRep.updateOne({ _id: id }, { $set: updateCatDto });
    return cat;
  }

  async remove(id: number) {
    const cat = await this.catRep.deleteOne({ _id: id })
    return cat;
  }
}
