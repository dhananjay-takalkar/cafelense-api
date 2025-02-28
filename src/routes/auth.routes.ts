import express, { Request, Response } from "express";
import { register, login } from "../controller/auth.controller";
import { returnResponse } from "../utils/response";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  returnResponse(await register(req), res);
});
router.post("/login", async (req: Request, res: Response) => {
  returnResponse(await login(req), res);
});

export default router;
