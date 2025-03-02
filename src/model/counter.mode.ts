import mongoose, { Schema, Document } from "mongoose";
import { ICounter } from "../types/counter.type";

const counterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
    default: 1,
  },
  cafe_id: {
    type: Number,
    ref: "Cafe",
  },
});

const Counter = mongoose.model<ICounter & Document>("Counter", counterSchema);

export default Counter;
