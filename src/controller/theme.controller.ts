import { createThemeService, getThemeService } from "../services/theme.services";
import { CommonResponse } from "../types/common.type";
import { RequestWithUser } from "../types/request.type";


const createTheme = async (req: RequestWithUser): Promise<CommonResponse> => {
    return await createThemeService(req.body, req.user);
  };

const getTheme = async (req: RequestWithUser): Promise<CommonResponse> => {
    return await getThemeService(req.query);
  };

export { createTheme, getTheme };
