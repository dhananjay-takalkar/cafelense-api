import { RequestWithUser } from "../types/request.type";
import { CommonResponse } from "../types/common.type";
import {
  createCategoryService,
  getCategoriesService,
  getCategoriesByCafeService,
} from "../services/category.services";

const createCategory = async (
  req: RequestWithUser
): Promise<CommonResponse> => {
  return await createCategoryService(req.body, req.user);
};

const getCategories = async (req: RequestWithUser): Promise<CommonResponse> => {
  return await getCategoriesService(req.query, req.user);
};

const getCategoriesByCafe = async (
  req: RequestWithUser
): Promise<CommonResponse> => {
  return await getCategoriesByCafeService(req.query, req.user);
};

export { createCategory, getCategories, getCategoriesByCafe };
