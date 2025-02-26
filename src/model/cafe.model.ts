import mongoose, { Schema, Document } from 'mongoose';
import { ICafe } from '../types/cafe.type';

const cafeSchema = new Schema({
    cafe_id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile_number: {
        type: String,
        required: true,
        unique: true
    },
    logo_url: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Cafe = mongoose.model<ICafe & Document>('Cafe', cafeSchema);

export default Cafe;
