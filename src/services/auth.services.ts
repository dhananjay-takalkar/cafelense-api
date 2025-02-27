import messages from "../utils/messages";
import { createUser, getUserByEmail } from "../repository/user.repository";
import { generateToken } from "../utils/token";
import bcrypt from "bcrypt";
import { CommonResponse } from "../types/common.type";
import { statusCodes } from "../utils/constants";
const registerService = async (body: any): Promise<CommonResponse> => {
  try {
    const { name, email, password, role = "admin" } = body;
    if (!name || !email || !password) {
      return {
        status: statusCodes.BAD_REQUEST,
        message: messages.INVALID_PARAMETERS,
        success: false,
      };
    }
    const { data } = await getUserByEmail(email);
    if (data) {
      return {
        status: statusCodes.BAD_REQUEST,
        message: messages.USER_ALREADY_EXISTS,
        success: false,
      };
    }
    const { data: user } = await createUser({
      name,
      email,
      password,
      role,
    });
    const token = generateToken({
      userId: user._id,
      role: user.role,
    });
    return {
      status: statusCodes.CREATED,
      message: messages.USER_CREATED_SUCCESSFULLY,
      data: { ...user, token },
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

const createNewUser = async (body: any): Promise<CommonResponse> => {
  try {
    const { email, password, role, cafe_id } = body;
    if (!email || !password || !role || !cafe_id) {
      return {
        status: statusCodes.BAD_REQUEST,
        message: messages.INVALID_PARAMETERS,
        success: false,
      };
    }
    const { data } = await getUserByEmail(email);
    if (data) {
      return {
        status: statusCodes.BAD_REQUEST,
        message: messages.USER_ALREADY_EXISTS,
        success: false,
      };
    }
    const { data: user } = await createUser({
      email,
      password,
      role,
      cafe_id,
    });
    return {
      status: statusCodes.CREATED,
      message: messages.USER_CREATED_SUCCESSFULLY,
      data: user,
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

const loginService = async (body: any): Promise<CommonResponse> => {
  try {
    const { email, password } = body;
    if (!email || !password) {
      return {
        status: statusCodes.BAD_REQUEST,
        message: messages.INVALID_PARAMETERS,
        success: false,
      };
    }
    const { data } = await getUserByEmail(email);
    if (!data) {
      return {
        status: statusCodes.BAD_REQUEST,
        message: messages.USER_NOT_FOUND,
        success: false,
      };
    }
    const isPasswordValid = await bcrypt.compare(password, data.password);
    if (!isPasswordValid) {
      return {
        status: statusCodes.BAD_REQUEST,
        message: messages.INVALID_CREDENTIALS,
        success: false,
      };
    }
    const token = generateToken({
      userId: data._id,
      cafe_id: data.cafe_id,
      role: data.role,
      email: data.email,
    });
    return {
      status: statusCodes.SUCCESS,
      message: messages.LOGIN_SUCCESS,
      data: { token, ...data, password: undefined },
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
export { registerService, createNewUser, loginService };
