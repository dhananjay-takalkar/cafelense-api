import Category from "../model/category.model";
import { statusCodes } from "../utils/constants";
import messages from "../utils/messages";

const createCategory = async (categoryData: any) => {
  try {
    const { name, userRole, cafe_id } = categoryData;
    if (!name || (userRole !== "superadmin" && !cafe_id)) {
      return {
        success: false,
        message: messages.INVALID_PARAMETERS,
        status: statusCodes.BAD_REQUEST,
      };
    }
    delete categoryData.userRole;
    const category = await Category.create(categoryData);
    if (!category) {
      return {
        success: false,
        message: messages.CATEGORY_CREATION_FAILED,
        status: statusCodes.BAD_REQUEST,
      };
    }
    return {
      success: true,
      message: messages.CATEGORY_CREATED_SUCCESSFULLY,
      status: statusCodes.CREATED,
      data: category,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

const getCategoryById = async (categoryId: string) => {
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return {
        success: false,
        message: messages.CATEGORY_NOT_FOUND,
        status: statusCodes.SUCCESS,
      };
    }
    return {
      success: true,
      message: messages.CATEGORY_FOUND,
      status: statusCodes.SUCCESS,
      data: category,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

const getCategoryByName = async (name: string) => {
  try {
    const category = await Category.findOne({ name });
    if (!category) {
      return {
        success: false,
        message: messages.CATEGORY_NOT_FOUND,
        status: statusCodes.SUCCESS,
      };
    }
    return {
      success: true,
      message: messages.CATEGORY_FOUND,
      status: statusCodes.SUCCESS,
      data: category,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export { createCategory, getCategoryById, getCategoryByName };
