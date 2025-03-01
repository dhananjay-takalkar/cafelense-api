import { RequestWithUser } from "../types/request.type";
import { CommonResponse } from "../types/common.type";
import { createCategoryService } from "../services/category.services";

const createCategory = async (
  req: RequestWithUser
): Promise<CommonResponse> => {
  return await createCategoryService(req.body);
};

export { createCategory };
