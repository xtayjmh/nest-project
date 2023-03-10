import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type CatDocument = Cat & Document;
@Schema()
export class Cat extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    age: number;

    @Prop()
    height: number;

    @Prop()
    breed: string
}
export const CatSchema = SchemaFactory.createForClass(Cat)
