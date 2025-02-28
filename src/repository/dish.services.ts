import Dish from "../model/dish.model";
import { ICreateDishBody } from "../types/dish.type";

const createDish = async (dishData: any): Promise<ICreateDishBody> => {
  try {
    const dish = await Dish.create(dishData);
    return { data: dish, success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

const getDishById = async (dishId: any) => {
  try {
    const dish = await Dish.findById(dishId);
    return { data: dish, success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

const getDishByCafeId = async (cafeId: any) => {
  try {
    const dish = await Dish.find({ cafe_id: cafeId });
    return { data: dish, success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

const updateDish = async (dishId: any, dishData: any) => {
  try {
    const dish = await Dish.findByIdAndUpdate(dishId, dishData);
    return { data: dish, success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

const deleteDish = async (dishId: any) => {
  try {
    const dish = await Dish.findByIdAndDelete(dishId);
    return { data: dish, success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export { createDish, getDishById, getDishByCafeId, updateDish };
