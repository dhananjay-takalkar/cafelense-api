import {
  createCafe,
  getCafeById,
  getCafeByMobileNumber,
  getCafeByUserId,
} from "../repository/cafe.repository";
import { getNextSequence } from "../repository/counter.repository";
import { COUNTER_NAME, statusCodes } from "../utils/constants";
import messages from "../utils/messages";
import { CommonResponse } from "../types/common.type";
import { updateUserById } from "../repository/user.repository";
import { getUserById } from "../repository/user.repository";
import { uploadImageToS3 } from "../utils/aws";
const addCafeService = async (
  body: any,
  file: any,
  userInfo: any
): Promise<CommonResponse> => {
  try {
    const { name, city, state, country, pincode, mobile_number } = body;
    const { email } = userInfo;
    console.log(body);
    if (
      !name ||
      // !city ||
      // !state ||
      !country ||
      !pincode ||
      !email ||
      !mobile_number
    ) {
      return {
        status: statusCodes.BAD_REQUEST,
        message: messages.INVALID_PARAMETERS,
        success: false,
      };
    }
    //check if user already has a cafe
    const userData = await getUserById(userInfo.userId);
    if (!userData.success || (userData.data && userData.data.cafe_id)) {
      return {
        status: statusCodes.BAD_REQUEST,
        message: messages.USER_ALREADY_HAS_CAFE,
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
    const nextCafeId: any = await getNextSequence(COUNTER_NAME.CAFE, null);
    if (!nextCafeId.success) {
      return {
        status: statusCodes.INTERNAL_SERVER_ERROR,
        message: nextCafeId.message,
        success: false,
      };
    }
    let logoUrl;
    if (file) {
      logoUrl = await uploadImageToS3(
        file,
        "cafeLogo",
        `/${nextCafeId.data.count}`
      );
    }
    const newCafe = await createCafe({
      name,
      city,
      state,
      country,
      pincode,
      email,
      mobile_number,
      logo_url: logoUrl?.data,
      id: nextCafeId.data,
    });
    console.log(userInfo);
    await updateUserById(userInfo.userId, {
      cafe_id: nextCafeId.data,
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
    console.log(userInfo);
    const { id } = userInfo;
    if (!id) {
      return {
        status: statusCodes.BAD_REQUEST,
        message: messages.INVALID_PARAMETERS,
        success: false,
      };
    }
    const cafe = await getCafeByUserId(id);
    console.log(cafe);
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
