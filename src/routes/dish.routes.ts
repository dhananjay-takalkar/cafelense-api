import {
  createDish,
  getDishById,
  getDishByCafeId,
  uploadImageController,
} from "../controller/dish.controller";
import express, { Request, Response } from "express";
import { returnResponse } from "../utils/response";
import { upload, validateToken } from "../utils/middleware";
import { RequestWithUser } from "../types/request.type";
const router = express.Router();

router.post(
  "/create-dish",
  validateToken,
  async (req: Request, res: Response) => {
    return returnResponse(await createDish(req), res);
  }
);
router.get("/get-dish-by-id", async (req: Request, res: Response) => {
  return returnResponse(await getDishById(req), res);
});
router.get("/get-dish-by-cafe-id", async (req: Request, res: Response) => {
  return returnResponse(await getDishByCafeId(req), res);
});

router.post(
  "/upload-image",
  validateToken,
  upload.single("image"),
  async (req: Request, res: Response) => {
    return returnResponse(await uploadImageController(req), res);
  }
);

export default router;
