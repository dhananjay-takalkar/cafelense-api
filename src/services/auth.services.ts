import messages from "../utils/messages";
import { addCafe } from "./cafe.services";
import { createUser, getUserByEmail } from "../repository/user.repository";
import { generateToken } from "../utils/token";
import bcrypt from "bcrypt";

const register = async (body: any) => {
  try {
    const { name, address, email, mobile_number, logo_url, password, role } =
      body;
    if (
      !name ||
      !address ||
      !email ||
      !mobile_number ||
      !logo_url ||
      !password ||
      !role
    ) {
      return { status: 400, message: messages.INVALID_PARAMETERS };
    }
    const cafe:any = await addCafe({
      name,
      address,
      email,
      mobile_number,
      logo_url,
    });
    if (!cafe.success) {
      return { status: 400, message: messages.CAFE_CREATION_FAILED, success: false };
    }
    const cafeId = cafe.data.cafe_id;
    const { data } = await getUserByEmail(email);
    if (data) {
      return { status: 400, message: messages.USER_ALREADY_EXISTS, success: false };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data: user } = await createUser({
      email,
      password: hashedPassword,
      role,
      cafe_id: cafeId,
    });
    const token = generateToken({ userId: user._id, cafe_id: cafeId , role: user.role});
    return {
      status: 201,
      message: messages.USER_CREATED_SUCCESSFULLY,
      data: { user, token },
      success: true,
    };
  } catch (error: any) {
    return { status: 500, message: error.message, success: false };
  }
};

const createNewUser = async (body: any) => {
  try {
    const { email, password, role, cafe_id } = body;
    if (!email || !password || !role || !cafe_id) {
      return { status: 400, message: messages.INVALID_PARAMETERS };
    }
    const { data } = await getUserByEmail(email);
    if (data) {
      return { status: 400, message: messages.USER_ALREADY_EXISTS };
    }
    const { data: user } = await createUser({
      email,
      password,
      role,
      cafe_id,
    });
    return {
      status: 201,
      message: messages.USER_CREATED_SUCCESSFULLY,
      data: user,
    };
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};

const login = async (body: any) => {
  try {
    const { email, password } = body;
    if (!email || !password) {
      return { status: 400, message: messages.INVALID_PARAMETERS };
    }
    const { data } = await getUserByEmail(email);
    if (!data) {
      return { status: 400, message: messages.USER_NOT_FOUND };
    }
    const isPasswordValid = await bcrypt.compare(password, data.password);
    if (!isPasswordValid) {
      return { status: 400, message: messages.INVALID_CREDENTIALS };
    }
    const token = generateToken({ userId: data._id, cafe_id: data.cafe_id, role: data.role });
    return {
      status: 200,
      message: messages.LOGIN_SUCCESS,
      data: { token, user: data },
    };
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};
export { register, createNewUser, login };
