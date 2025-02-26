import express, { Request, Response } from "express";
import { registerCafe, loginUser } from "../controller/auth.controller";
import { returnResponse } from "../utils/response";

const router = express.Router();

router.post("/register-cafe", async (req: Request, res: Response) => {
  returnResponse(await registerCafe(req), res);
});
router.post("/login-user", async (req: Request, res: Response) => {
  returnResponse(await loginUser(req), res);
});

export default router;
