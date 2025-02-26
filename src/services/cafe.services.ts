import {
  createCafe,
  getCafeById,
  getCafeByMobileNumber,
} from "../repository/cafe.repository";
import { getCounter } from "../repository/counter.repository";
import { COUNTER_NAME, statusCodes } from "../utils/constants";
import messages from "../utils/messages";
import { CommonResponse } from "../types/common.type";

const addCafe = async (body: any): Promise<CommonResponse> => {
  try {
    const {
      name,
      city,
      state,
      country,
      pincode,
      email,
      mobile_number,
      logo_url,
    } = body;
    if (
      !name ||
      !city ||
      !state ||
      !country ||
      !pincode ||
      !email ||
      !mobile_number ||
      !logo_url
    ) {
      return {
        status: statusCodes.BAD_REQUEST,
        message: messages.INVALID_PARAMETERS,
        success: false,
      };
    }
    const cafe = await getCafeByMobileNumber(mobile_number);
    if (cafe.data) {
      return {
        status: statusCodes.BAD_REQUEST,
        message: messages.CAFE_ALREADY_EXISTS,
        success: false,
      };
    }
    const cafeId: any = await getCounter(COUNTER_NAME.CAFE, null);
    if (!cafeId.success) {
      return {
        status: statusCodes.INTERNAL_SERVER_ERROR,
        message: cafeId.message,
        success: false,
      };
    }
    const newCafe = await createCafe({
      name,
      city,
      state,
      country,
      pincode,
      email,
      mobile_number,
      logo_url,
      cafe_id: cafeId.data.count,
    });
    return {
      status: statusCodes.CREATED,
      message: messages.CAFE_CREATED_SUCCESSFULLY,
      data: newCafe.data,
      success: true,
    };
  } catch (error: any) {
    return {
      status: statusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      success: false,
    };
  }
};

const getCafeByIdService = async (body: any): Promise<CommonResponse> => {
  try {
    const { cafe_id, show_dishes } = body;
    if (!cafe_id) {
      return {
        status: statusCodes.BAD_REQUEST,
        message: messages.INVALID_PARAMETERS,
        success: false,
      };
    }
    let cafeMenuData: any = [];
    if (show_dishes) {
      cafeMenuData = await getCafeById(cafe_id);
    }
    if (!cafeMenuData.data) {
      return {
        status: statusCodes.BAD_REQUEST,
        message: messages.CAFE_NOT_FOUND,
        success: false,
      };
    }
    return {
      status: statusCodes.SUCCESS,
      message: messages.CAFE_FOUND,
      data: cafeMenuData.data,
      success: true,
    };
  } catch (error: any) {
    return {
      status: statusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      success: false,
    };
  }
};

export { addCafe, getCafeByIdService };
