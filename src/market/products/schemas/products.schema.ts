import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ProductDocument = ProductEntity & Document;

@Schema({
    toJSON: {
        virtuals: true
    }
})
export class ProductEntity {
    id?: string;

    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    description: string;

    @Prop({type: [mongoose.Schema.Types.ObjectId], ref: 'Images', required: true})
    images: mongoose.Schema.Types.ObjectId[];

    @Prop({type: String, default: ''})
    brand?: string;

    @Prop({type: Number, default: 0})
    price?: number;

    @Prop({type: Number, default: 0})
    oldPrice?: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true})
    category: mongoose.Schema.Types.ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory'})
    subCategory: mongoose.Schema.Types.ObjectId;

    @Prop({type: Number, required: true})
    countInStock: number;

    @Prop({type: Number, default: 0})
    rating?: number;

    @Prop({type: Boolean, default: false})
    isFeatured?: boolean;

    @Prop({type: Number, required: false})
    discount?: number;

    @Prop({type: [String], default: []})
    rams?: string[];

    @Prop({type: [String], default: []})
    size?: string[];

    @Prop({type: [String], default: []})
    weight?: string[];

    @Prop({type: String, required: false})
    location?: string;

    @Prop({type: Date, default: Date.now})
    dateCreated?: Date;
}

const ProductSchema = SchemaFactory.createForClass(ProductEntity);

ProductSchema.virtual('id').get(function() {
    return this._id.toHexString();
})

export { ProductSchema }
