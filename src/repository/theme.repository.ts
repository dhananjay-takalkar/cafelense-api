import { ITheme } from "../types/theme.type";
import Theme from "../model/theme.model";

const addTheme = async (theme: ITheme) => {
  try {
    const newTheme = await Theme.create(theme);
    return newTheme;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getTheme = async (themeId: string) => {
  try {
    const theme = await Theme.findById(themeId);
    return theme;
  } catch (error: any) {
    throw new Error(error);
  }
};
