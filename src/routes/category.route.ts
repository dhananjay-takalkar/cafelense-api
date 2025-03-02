import router from "./dish.routes";
import {
  createCategory,
  getCategories,
  getCategoriesByCafe,
} from "../controller/category.controller";
import { Request, Response } from "express";
import { returnResponse } from "../utils/response";
import { validateToken } from "../utils/middleware";
import { RequestWithUser } from "../types/request.type";

router.post(
  "/create-category",
  validateToken,
  async (req: Request, res: Response) => {
    return returnResponse(await createCategory(req), res);
  }
);

router.get(
  "/get-categories",
  validateToken,
  async (req: Request, res: Response) => {
    return returnResponse(await getCategories(req), res);
  }
);

router.get(
  "/get-categories-by-cafe",
  validateToken,
  async (req: RequestWithUser, res: Response) => {
    return returnResponse(await getCategoriesByCafe(req), res);
  }
);
export default router;
