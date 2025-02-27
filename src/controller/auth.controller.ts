import { Request } from "express";
import { loginService, registerService } from "../services/auth.services";
import { CommonResponse } from "../types/common.type";

const register = async (req: Request): Promise<CommonResponse> => {
  return await registerService(req.body);
};

const login = async (req: Request): Promise<CommonResponse> => {
  return await loginService(req.body);
};

export { register, login };
