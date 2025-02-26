import mongoose, { Schema, Document } from 'mongoose';
import { ICategory } from '../types/category.type';


const categorySchema = new Schema({
    category_id: {
        type: Number,
        required: true,
        unique: true
    },
    cafe_id: {
        type: Number,
        required: true,
        ref: 'Cafe'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    is_visible: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Category = mongoose.model<ICategory & Document>('Category', categorySchema);

export default Category;
