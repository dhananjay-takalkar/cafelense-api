import router from "./dish.routes";
import { createCategory } from "../controller/category.controller";
import { Request, Response } from "express";
import { returnResponse } from "../utils/response";
import { validateToken } from "../utils/middleware";

router.post(
  "/create-category",
  validateToken,
  async (req: Request, res: Response) => {
    return returnResponse(await createCategory(req), res);
  }
);

export default router;
