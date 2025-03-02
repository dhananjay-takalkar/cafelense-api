import { statusCodes } from "../utils/constants";
import { createCategory } from "../repository/category.repository";
import { CommonResponse } from "../types/common.type";

const createCategoryService = async (
  categoryData: any
): Promise<CommonResponse> => {
  try {
    const category = await createCategory(categoryData);
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

export { createCategoryService };
