import mongoose, { Schema, Document } from "mongoose";
import { ICategory } from "../types/category.type";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    cafe_id: {
      type: Number,
      ref: "Cafe",
    },
    is_delete: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Category = mongoose.model<ICategory & Document>(
  "Category",
  categorySchema
);

export default Category;
