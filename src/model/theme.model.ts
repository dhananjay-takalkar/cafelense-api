import mongoose, { Schema, Document } from "mongoose";
import { ITheme } from "../types/theme.type";
const themeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Theme = mongoose.model<ITheme & Document>("Theme", themeSchema);
