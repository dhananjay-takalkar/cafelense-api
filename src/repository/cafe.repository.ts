import mongoose, { Types } from "mongoose";
import Cafe from "../model/cafe.model";
import { ICafe } from "../types/cafe.type";
import { statusCodes } from "../utils/constants";
import User from "../model/user.model";

const createCafe = async (cafeData: ICafe) => {
  try {
    const cafe = await Cafe.create(cafeData);
    if (!cafe) {
      return {
        status: statusCodes.BAD_REQUEST,
        message: "Cafe not created",
        success: false,
      };
    }
    return {
      status: statusCodes.CREATED,
      message: "Cafe created successfully",
      success: true,
      data: cafe,
    };
  } catch (error: any) {
    throw { success: false, message: error.message };
  }
};

const getCafeById = async (cafeId: any) => {
  try {
    const cafe = await Cafe.findOne({ id: cafeId });
    if (!cafe) {
      return {
        status: statusCodes.SUCCESS,
        message: "Cafe not found",
        success: false,
      };
    }
    return {
      status: statusCodes.SUCCESS,
      message: "Cafe found successfully",
      success: true,
      data: cafe,
    };
  } catch (error: any) {
    throw { success: false, message: error.message };
  }
};

const getCafeByMobileNumber = async (mobileNumber: any) => {
  try {
    const cafe = await Cafe.findOne({ mobile_number: mobileNumber });
    if (!cafe) {
      return {
        status: statusCodes.SUCCESS,
        message: "Cafe not found",
        success: false,
      };
    }
    return {
      status: statusCodes.SUCCESS,
      message: "Cafe found successfully",
      success: true,
      data: cafe,
    };
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
    if (!cafe) {
      return {
        status: statusCodes.SUCCESS,
        message: "Cafe not found",
        success: false,
      };
    }
    return {
      status: statusCodes.SUCCESS,
      message: "Cafe found successfully",
      success: true,
      data: cafe,
    };
  } catch (error: any) {
    throw { success: false, message: error.message };
  }
};

const getCafeByUserId = async (userId: any) => {
  try {
    let match = {};
    if (userId) {
      match = {
        _id: new mongoose.Types.ObjectId(userId),
      };
    }
    const cafe = await User.aggregate([
      {
        $match: match,
      },
      {
        $lookup: {
          from: "caves",
          localField: "cafe_id",
          foreignField: "id",
          as: "cafeData",
        },
      },
      {
        $unwind: "$cafeData",
      },
      {
        $project: {
          _id: 1,
          name: 1,
          cafe_id: 1,
          cafeData: {
            _id: 1,
            name: 1,
            mobile_number: 1,
            email: 1,
            logo_url: 1,
            city: 1,
            state: 1,
          },
        },
      },
    ]);

    return { data: cafe, success: true };
  } catch (error: any) {
    console.log(error);
    throw { success: false, message: error.message };
  }
};
export {
  createCafe,
  getCafeById,
  getCafeByMobileNumber,
  getCafeMenu,
  getCafeByUserId,
};
