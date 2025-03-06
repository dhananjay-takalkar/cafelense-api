import DishCategory from "../model/dishCategory.model";
import { statusCodes } from "../utils/constants";

const createDishCategory = async (dishCategoryData: any) => {
  try {
    const dishCategory = await DishCategory.create(dishCategoryData);
    if (!dishCategory) {
      return {
        success: false,
        message: "FAILED",
        status: statusCodes.BAD_REQUEST,
      };
    }
    return {
      success: true,
      message: "Success",
      status: statusCodes.CREATED,
      data: dishCategory,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

const createManyDishCategories = async (dishCategoryData: any) => {
  try {
    const dishCategory = await DishCategory.insertMany(dishCategoryData);
    if (!dishCategory) {
      return {
        success: false,
        message: "FAILED",
        status: statusCodes.BAD_REQUEST,
      };
    }
    return {
      success: true,
      message: "Success",
      status: statusCodes.CREATED,
      data: dishCategory,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export { createDishCategory, createManyDishCategories };
