import mongoose, { Schema, Document } from "mongoose";
import { ICafe } from "../types/cafe.type";

const cafeSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      // required: true,
    },
    state: {
      type: String,
      // required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile_number: {
      type: String,
      required: true,
      unique: true,
    },
    logo_url: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    themeColor_id: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "ThemeColor",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Cafe = mongoose.model<ICafe & Document>("Cafe", cafeSchema);

export default Cafe;
