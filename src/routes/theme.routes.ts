import { createTheme, getTheme } from "../controller/theme.controller";
import { validateToken } from "../utils/middleware";
import { returnResponse } from "../utils/response";
import router from "./dish.routes";
import { RequestWithUser } from "../types/request.type";
import { Response } from "express";


router.post(
  "/create-theme",
  validateToken,
  async (req: RequestWithUser, res: Response) => {
    return returnResponse(await createTheme(req), res);
  }
  );

router.get(
  "/get-theme",
  validateToken,
  async (req: RequestWithUser, res: Response) => {
    return returnResponse(await getTheme(req), res);
  }
);

export default router;