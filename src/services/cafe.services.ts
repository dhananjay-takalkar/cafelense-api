import {
  createCafe,
  getCafeById,
  getCafeByMobileNumber,
} from "../repository/cafe.repository";
import { getCounter } from "../repository/counter.repository";
import { COUNTER_NAME, statusCodes } from "../utils/constants";
import messages from "../utils/messages";
import { CommonResponse } from "../types/common.type";
import { updateUserById } from "../repository/user.repository";

const addCafeService = async (
  body: any,
  userInfo: any
): Promise<CommonResponse> => {
  try {
    const { name, city, state, country, pincode, mobile_number, logo_url } =
      body;
    const { email } = userInfo;

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
    const nextCafeId: any = await getCounter(COUNTER_NAME.CAFE, null);
    if (!nextCafeId.success) {
      return {
        status: statusCodes.INTERNAL_SERVER_ERROR,
        message: nextCafeId.message,
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
      id: nextCafeId.data.count,
    });
    console.log(userInfo);
    await updateUserById(userInfo.userId, {
      cafe_id: nextCafeId.data.count,
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

const getCafeService = async (userInfo: any): Promise<CommonResponse> => {
  try {
    const { cafe_id } = userInfo;
    if (!cafe_id) {
      return {
        status: statusCodes.BAD_REQUEST,
        message: messages.INVALID_PARAMETERS,
        success: false,
      };
    }
    const cafe = await getCafeById(cafe_id);
    if (!cafe.data) {
      return {
        status: statusCodes.BAD_REQUEST,
        message: messages.CAFE_NOT_FOUND,
        success: false,
      };
    }
    return {
      status: statusCodes.SUCCESS,
      message: messages.CAFE_FOUND,
      data: cafe.data,
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

export { addCafeService, getCafeByIdService, getCafeService };
