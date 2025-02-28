import express, { Request, Response } from "express";
import { addCafe, getCafe } from "../controller/cafe.controller";
import { returnResponse } from "../utils/response";
import { validateToken } from "../utils/middleware";

const router = express.Router();

router.get("/", validateToken, async (req: Request, res: Response) => {
  return returnResponse(await getCafe(req), res);
});

router.post("/create", validateToken, async (req: Request, res: Response) => {
  return returnResponse(await addCafe(req), res);
});

export default router;
