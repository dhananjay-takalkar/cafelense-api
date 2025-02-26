import { Types } from "mongoose";

export interface ICounter {
    name: string;
    count: number;
    cafe_id: Types.ObjectId;
}
