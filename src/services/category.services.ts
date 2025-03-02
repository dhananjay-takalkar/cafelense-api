import { statusCodes } from "../utils/constants";
import {
  createCategory,
  getAllCategories,
  getCategoriesById,
  getCategoriesByCafe,
} from "../repository/category.repository";
import { CommonResponse } from "../types/common.type";
import messages from "../utils/messages";

const createCategoryService = async (
  categoryData: any,
  userData: any
): Promise<CommonResponse> => {
  try {
    const { name } = categoryData;
    const { cafe_id, role } = userData;
    if (!name || (role !== "superadmin" && !cafe_id)) {
      return {
        success: false,
        message: messages.INVALID_PARAMETERS,
        status: statusCodes.BAD_REQUEST,
      };
    }
    const category = await createCategory({ name, cafe_id });
    if (!category.success) {
      return category;
    }
    return category;
  } catch (error: any) {
    return {
      status: statusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      success: false,
    };
  }
};

const getCategoriesService = async (
  query: any,
  userData: any
): Promise<CommonResponse> => {
  try {
    const { cafe_id, page = 1, limit = 10 } = query;
    let match: {
      cafe_id?: any;
      limit?: number;
      skip?: number;
    } = {};
    const { role } = userData;
    if (role !== "superadmin") {
      match = { cafe_id: userData.cafe_id };
    } else {
      match = { cafe_id };
    }
    const skip = (page - 1) * limit;
    const categoriesAddedByCafe: any = await getAllCategories({
      match,
      limit,
      skip,
    });
    if (!categoriesAddedByCafe.success) {
      return categoriesAddedByCafe;
    }
    if (categoriesAddedByCafe?.data?.length == limit) {
      return {
        ...categoriesAddedByCafe,
        data: {
          categoriesAddedByCafe: categoriesAddedByCafe.data,
          categoriesAddedByOthers: [],
        },
      };
    }
    let newLimit = limit - categoriesAddedByCafe.data.length;
    if (match.cafe_id) {
      match = { cafe_id: { $ne: match.cafe_id } };
    }
    const categoriesAddedByOthers: any = await getAllCategories({
      match,
      limit: newLimit,
      skip,
    });
    if (!categoriesAddedByOthers.success) {
      return categoriesAddedByOthers;
    }
    return {
      success: true,
      message: messages.CATEGORIES_FOUND,
      status: statusCodes.SUCCESS,
      data: {
        categoriesAddedByCafe: categoriesAddedByCafe.data,
        categoriesAddedByOthers: categoriesAddedByOthers.data,
      },
    };
  } catch (error: any) {
    return {
      status: statusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      success: false,
    };
  }
};

const getCategoriesByCafeService = async (
  query: any,
  userData: any
): Promise<CommonResponse> => {
  try {
    let { cafe_id } = query;
    const { role } = userData;
    if (role !== "superadmin") {
      cafe_id = userData.cafe_id;
    }
    const categories = await getCategoriesByCafe(cafe_id);
    return categories;
  } catch (error: any) {
    return {
      status: statusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      success: false,
    };
  }
};

export {
  createCategoryService,
  getCategoriesService,
  getCategoriesByCafeService,
};
