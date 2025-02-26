import mongoose, { Schema, Document } from 'mongoose';
import { IDishCategory } from '../types/dishCategory.type';



const dishCategorySchema = new Schema({
    dish_id: {
        type: Number,
        required: true,
        ref: 'Dish'
    },
    category_id: {
        type: Number,
        required: true,
        ref: 'Category'
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// Create compound index for unique dish_id + category_id combination
dishCategorySchema.index({ dish_id: 1, category_id: 1 }, { unique: true });

const DishCategory = mongoose.model<IDishCategory & Document>('DishCategory', dishCategorySchema);

export default DishCategory;
