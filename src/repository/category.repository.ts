import Category from "../model/category.model";
import { statusCodes } from "../utils/constants";
import messages from "../utils/messages";

const getAllCategories = async (query: any) => {
  try {
    const categories = await Category.find(query.match)
      .limit(query.limit)
      .skip(query.skip);
    if (!categories) {
      return {
        success: false,
        message: messages.CATEGORIES_NOT_FOUND,
        status: statusCodes.SUCCESS,
      };
    }
    return {
      success: true,
      message: messages.CATEGORIES_FOUND,
      status: statusCodes.SUCCESS,
      data: categories,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

const createCategory = async (categoryData: any) => {
  try {
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

const getCategoriesById = async (categoryIds: string[]) => {
  try {
    const categories = await Category.find({ _id: { $in: categoryIds } });
    if (!categories) {
      return {
        success: false,
        message: messages.CATEGORIES_NOT_FOUND,
        status: statusCodes.SUCCESS,
      };
    }
    return {
      success: true,
      message: messages.CATEGORIES_FOUND,
      status: statusCodes.SUCCESS,
      data: categories,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

const getCategoriesByCafe = async (cafeId: string) => {
  try {
    const categories = await Category.find({ cafe_id: cafeId });
    return {
      success: true,
      message: messages.CATEGORIES_FOUND,
      status: statusCodes.SUCCESS,
      data: categories,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export {
  createCategory,
  getCategoryById,
  getCategoryByName,
  getCategoriesById,
  getAllCategories,
  getCategoriesByCafe,
};
