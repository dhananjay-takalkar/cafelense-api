import mongoose, { Schema, Document } from "mongoose";
import { IDish } from "../types/dish.type";

const dishSchema = new Schema(
  {
    dish_id: {
      type: Number,
      required: true,
    },
    cafe_id: {
      type: Number,
      required: true,
      index: true,
      ref: "Cafe",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      //   required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    is_available: {
      type: Boolean,
      default: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_delete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Create unique index for dish_id + cafe_id
dishSchema.index({ dish_id: 1, cafe_id: 1 }, { unique: true });

dishSchema.index({ name: 1, cafe_id: 1 }, { unique: true });
// Create index for is_available is_active is_delete
dishSchema.index({ is_available: 1, is_active: 1, is_delete: 1 });

const Dish = mongoose.model<IDish & Document>("Dish", dishSchema);

export default Dish;
