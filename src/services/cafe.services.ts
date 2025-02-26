import { createCafe, getCafeByMobileNumber } from '../repository/cafe.repository';
import { getCounter } from '../repository/counter.repository';
import { COUNTER_NAME } from '../utils/constants';
import messages from "../utils/messages";

const addCafe = async (body: any) => {
  try {
    const { name, address, email, mobile_number, logo_url } = body;
    if (!name || !address || !email || !mobile_number || !logo_url) {
      return { status: 400, message: messages.INVALID_PARAMETERS, success: false };
    }
    const cafe = await getCafeByMobileNumber(mobile_number);
    if (cafe.data) {
      return { status: 400, message: messages.CAFE_ALREADY_EXISTS, success: false };
    }
    const cafeId:any = await getCounter(COUNTER_NAME.CAFE, null);
    if(!cafeId.success){
      return { status: 500, message: cafeId.message, success: false };
    }
    const newCafe = await createCafe({
      name,
      address,
      email,
      mobile_number,
      logo_url,
      cafe_id: cafeId.data.count,
    });
    return {
      status: 201,
      message: messages.CAFE_CREATED_SUCCESSFULLY,
      data: newCafe.data,
      success: true,
    };
  } catch (error: any) {
    return { status: 500, message: error.message, success: false };
  }
};

export { addCafe };
