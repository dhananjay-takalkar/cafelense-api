import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../types/user.type';


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'waiter', 'manager', 'user'],
        default: 'user'
    },
    cafe_id: {
        type: Number,
        required: true,
        ref: 'Cafe'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const User = mongoose.model<IUser & Document>('User', userSchema);

export default User;
