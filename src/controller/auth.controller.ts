

import { Request, Response } from "express";
import { login } from "../services/auth.services";
import { register } from "../services/auth.services";
import { returnResponse } from "../utils/response";

const registerCafe = async (req: Request, res: Response) => {
  const { status, message, data } = await register(req.body);
  return returnResponse({status, message, data}, res);
}

const loginUser = async (req: Request, res: Response) => {
  const { status, message, data } = await login(req.body);
  return returnResponse({status, message, data}, res);
}

export { registerCafe, loginUser };
