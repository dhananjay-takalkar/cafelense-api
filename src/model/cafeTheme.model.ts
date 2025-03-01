import mongoose, { Schema, Document } from "mongoose";
import { ICafeTheme } from "../types/cafeTheme.type";

const cafeThemeSchema = new Schema(
  {
    theme_id: {
      type: Number,
      required: true,
      unique: true,
    },
    cafe_id: {
      type: Number,
      required: true,
      ref: "Cafe",
      unique: true,
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

const CafeTheme = mongoose.model<ICafeTheme & Document>(
  "CafeTheme",
  cafeThemeSchema
);

export default CafeTheme;
