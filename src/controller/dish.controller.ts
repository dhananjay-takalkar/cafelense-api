import { CommonResponse } from "../types/common.type";
import {
  createDishService,
  getDishByIdService,
  getDishByCafeIdService,
  uploadImageService,
} from "../services/dish.services";
import { Request } from "express";
import { RequestWithUser } from "../types/request.type";
const createDish = async (req: RequestWithUser): Promise<CommonResponse> => {
  return await createDishService(req.body, req.user);
};

const getDishById = async (req: Request): Promise<CommonResponse> => {
  return await getDishByIdService(req.query);
};

const getDishByCafeId = async (req: Request): Promise<CommonResponse> => {
  return await getDishByCafeIdService(req.query);
};

const uploadImageController = async (req: Request): Promise<CommonResponse> => {
  return await uploadImageService(req.file);
};

export { createDish, getDishById, getDishByCafeId, uploadImageController };
