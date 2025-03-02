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
import {
  createCategory,
  getCategoryByName,
} from "../repository/category.repository";
import { uploadImageToS3 } from "../utils/aws";
import { getNextSequence } from "../repository/counter.repository";

const createDishService = async (
  dishData: any,
  file: any,
  userData: any
): Promise<CommonResponse> => {
  try {
    const { name, price, category } = dishData;
    const { role } = userData;
    let { cafe_id } = dishData;
    if (role !== "superadmin") {
      cafe_id = userData.cafe_id;
    }
    if (!name || !price || !cafe_id || !file || !category) {
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
    let categoryData = await getCategoryByName(category);
    if (!categoryData.data) {
      categoryData = await createCategory({
        name: category,
        cafe_id,
        userRole: role,
      });
    }
    if (!categoryData.success) {
      return categoryData;
    }
    const imageUrl = await uploadImageToS3(file, name, cafe_id);
    console.log("imageUrl", imageUrl);
    if (!imageUrl.success) {
      return {
        success: false,
        message: imageUrl.message,
        status: statusCodes.BAD_REQUEST,
      };
    }
    dishData.image_url = imageUrl.data;
    const dishId = await getNextSequence("dish", cafe_id);
    const dish = await createDish({
      ...dishData,
      cafe_id,
      dish_id: dishId.data,
    });
    return {
      success: true,
      message: messages.DISH_CREATED_SUCCESSFULLY,
      data: dish,
      status: statusCodes.CREATED,
    };
  } catch (error: any) {
    console.log("error", error);
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
