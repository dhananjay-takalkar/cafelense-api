import mongoose, { Schema, Document } from 'mongoose';
import { IThemeColor } from '../types/themeColor.type';


const themeColorSchema = new Schema({
    color_id: {
        type: Number,
        required: true,
        unique: true
    },
    theme_id: {
        type: Number,
        required: true,
        ref: 'CafeTheme'
    },
    color_name: {
        type: String,
        required: true
    },
    color_value: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const ThemeColor = mongoose.model<IThemeColor & Document>('ThemeColor', themeColorSchema);

export default ThemeColor;
