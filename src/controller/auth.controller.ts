import { Request } from "express";
import { login } from "../services/auth.services";
import { register } from "../services/auth.services";
import { CommonResponse } from "../types/common.type";

const registerCafe = async (req: Request): Promise<CommonResponse> => {
  return await register(req.body);
};

const loginUser = async (req: Request): Promise<CommonResponse> => {
  return await login(req.body);
};

export { registerCafe, loginUser };
