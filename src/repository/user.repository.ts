import User from "../model/user.model";
import messages from "../utils/messages";

const createUser = async (userData: any) => {
  try {
    const user: any = await User.create(userData);
    return {
      data: { ...user._doc, password: undefined, __v: undefined },
      success: true,
    };
  } catch (error: any) {
    throw { success: false, message: error.message };
  }
};

const getUserByEmail = async (email: any) => {
  try {
    const user = await User.findOne({ email })
      .select("-__v -updated_at -created_at")
      .lean();
    return { data: user, success: true };
  } catch (error: any) {
    throw { success: false, message: error.message };
  }
};

const getUserById = async (id: any) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return { success: false, message: messages.USER_NOT_FOUND };
    }
    return { data: user, success: true };
  } catch (error: any) {
    throw { success: false, message: error.message };
  }
};

const updateUserById = async (id: any, userData: any) => {
  try {
    console.log(userData, id);
    const user = await User.findByIdAndUpdate(id, userData, { new: true });
    return { data: user, success: true };
  } catch (error: any) {
    throw { success: false, message: error.message };
  }
};
export { createUser, getUserByEmail, getUserById, updateUserById };
