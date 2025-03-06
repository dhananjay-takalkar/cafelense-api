import Theme from "../model/theme.model";
import { statusCodes } from "../utils/constants";
const createThemeRepository = async (body: any) => {
try {
    const theme = await Theme.create(body);
    if (!theme) {
        return {
            status: statusCodes.BAD_REQUEST,
            message: "Theme not created",
            success: false,
        };
    }
    return {
        status: statusCodes.CREATED,
        message: "Theme created successfully",
        success: true,
        data: theme,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

const getThemeRepository = async (limit: number, skip: number) => {
    try {
        const theme = await Theme.find().limit(limit).skip(skip);
        if (!theme) {
            return {
                status: statusCodes.NOT_FOUND,
                message: "Theme not found",
                success: false,
            };
        }
        return {
            status: statusCodes.SUCCESS,
            message: "Theme found successfully",
            success: true,
            data: theme,
        };
    } catch (error: any) {
        throw new Error(error);
    }
};
export { createThemeRepository, getThemeRepository };
