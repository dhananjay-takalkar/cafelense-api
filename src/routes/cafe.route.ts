import express, { Request, Response } from "express";
import { addCafe, getCafe } from "../controller/cafe.controller";
import { returnResponse } from "../utils/response";
import { upload, validateToken } from "../utils/middleware";

const router = express.Router();

router.post(
  "/create",
  validateToken,
  upload.single("logo"),
  async (req: Request, res: Response) => {
    return returnResponse(await addCafe(req), res);
  }
);

router.get("/", validateToken, async (req: Request, res: Response) => {
  return returnResponse(await getCafe(req), res);
});

export default router;
