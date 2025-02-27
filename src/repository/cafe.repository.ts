import mongoose from "mongoose";
import Cafe from "../model/cafe.model";
import { ICafe } from "../types/cafe.type";

const createCafe = async (cafeData: ICafe) => {
  try {
    console.log(cafeData);
    const cafe = await Cafe.create(cafeData);
    return { data: cafe, success: true };
  } catch (error: any) {
    throw { success: false, message: error.message };
  }
};

const getCafeById = async (cafeId: any) => {
  try {
    const cafe = await Cafe.findOne({ id: cafeId });
    return { data: cafe, success: true };
  } catch (error: any) {
    throw { success: false, message: error.message };
  }
};

const getCafeByMobileNumber = async (mobileNumber: any) => {
  try {
    const cafe = await Cafe.findOne({ mobile_number: mobileNumber });
    return { data: cafe, success: true };
  } catch (error: any) {
    throw { success: false, message: error.message };
  }
};

const getCafeMenu = async (cafeId: any) => {
  try {
    const cafe = await Cafe.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(cafeId),
        },
      },
      {
        $lookup: {
          from: "dishes",
          localField: "dishes",
          foreignField: "_id",
          as: "dishes",
        },
      },
      {
        $unwind: "$dishes",
      },
      {
        $lookup: {
          from: "dish_categories",
          localField: "dishes.dish_id",
          foreignField: "dish_id",
          as: "dish_categories",
        },
      },
      {
        $unwind: "$dish_categories",
      },
      {
        $lookup: {
          from: "categories",
          localField: "dish_categories.category_id",
          foreignField: "_id",
          as: "categories",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          dishes: 1,
        },
      },
    ]);
    return { data: cafe, success: true };
  } catch (error: any) {
    throw { success: false, message: error.message };
  }
};
export { createCafe, getCafeById, getCafeByMobileNumber, getCafeMenu };
