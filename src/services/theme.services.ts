import { statusCodes } from "../utils/constants";
import { createThemeRepository, getThemeRepository } from "../repository/theme.repository";
const createThemeService = async (body: any, user: any) => {
    try {
        const { name, description, image } = body;
        if (!name || !description || !image) {
            return {
      status: statusCodes.BAD_REQUEST,
      message: "All fields are required",
      success: false,
    };
  }
    const theme = await createThemeRepository(body);
    return theme;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getThemeService = async (query: any) => {
    try {
        const { limit = 10, page = 1 } = query;
        const skip = (page - 1) * limit;
        const theme = await getThemeRepository(limit, skip);
        return theme;
    } catch (error: any) {
        throw new Error(error);
    }
};

export { createThemeService, getThemeService };
