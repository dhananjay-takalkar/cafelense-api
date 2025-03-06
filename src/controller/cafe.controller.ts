import { Request } from "express";
import { addCafeService, getCafeService } from "../services/cafe.services";
import { CommonResponse } from "../types/common.type";

const addCafe = async (req: Request): Promise<CommonResponse> => {
  return await addCafeService(req.body, req.file, (req as any).user);
};

const getCafe = async (req: Request): Promise<CommonResponse> => {
  return await getCafeService((req as any).user);
};

export { addCafe, getCafe };
