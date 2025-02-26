import { CommonResponse } from "../types/common.type";
import messages from "../utils/messages";
import { statusCodes } from "../utils/constants";
import { getCafeById } from "../repository/cafe.repository";
import {
  createDish,
  getDishByCafeId,
  getDishById,
} from "../repository/dish.services";
import { uploadImage } from "../utils/utils";

const createDishService = async (
  dishData: any,
  userData: any
): Promise<CommonResponse> => {
  try {
    const { name, description, price, image_url } = dishData;
    const { role } = userData;
    let { cafe_id } = dishData;
    if (role !== "superadmin") {
      cafe_id = userData.cafe_id;
    }
    if (!name || !price || !image_url || !cafe_id) {
      return {
        success: false,
        message: messages.INVALID_PARAMETERS,
        status: statusCodes.BAD_REQUEST,
      };
    }
    const cafe = await getCafeById(cafe_id);
    if (!cafe.data) {
      return {
        success: false,
        message: messages.CAFE_NOT_FOUND,
        status: statusCodes.BAD_REQUEST,
      };
    }
    const dish = await createDish(dishData);
    return {
      success: true,
      message: messages.DISH_CREATED_SUCCESSFULLY,
      data: dish,
      status: statusCodes.CREATED,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      status: statusCodes.BAD_REQUEST,
    };
  }
};

const getDishByIdService = async (dishId: any): Promise<CommonResponse> => {
  try {
    const dish = await getDishById(dishId);
    if (!dish.data) {
      return {
        success: false,
        message: messages.DISH_NOT_FOUND,
        status: statusCodes.BAD_REQUEST,
      };
    }
    return {
      success: true,
      message: messages.DISH_FOUND,
      data: dish.data,
      status: statusCodes.SUCCESS,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      status: statusCodes.BAD_REQUEST,
    };
  }
};

const getDishByCafeIdService = async (cafeId: any): Promise<CommonResponse> => {
  try {
    const cafe = await getCafeById(cafeId);
    if (!cafe.data) {
      return {
        success: false,
        message: messages.CAFE_NOT_FOUND,
        status: statusCodes.BAD_REQUEST,
      };
    }
    const dish = await getDishByCafeId(cafeId);
    if (!dish.data) {
      return {
        success: false,
        message: messages.DISH_NOT_FOUND,
        status: statusCodes.SUCCESS,
      };
    }
    return {
      success: true,
      message: messages.DISH_FOUND,
      data: dish.data,
      status: statusCodes.SUCCESS,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      status: statusCodes.BAD_REQUEST,
    };
  }
};

const uploadImageService = async (file: any): Promise<CommonResponse> => {
  try {
    if (!file) {
      return {
        success: false,
        message: messages.INVALID_PARAMETERS,
        status: statusCodes.BAD_REQUEST,
      };
    }
    const imageUrl = await uploadImage(file);
    return imageUrl;
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      status: statusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

export {
  createDishService,
  getDishByIdService,
  getDishByCafeIdService,
  uploadImageService,
};
