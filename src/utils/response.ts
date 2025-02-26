import { Response } from "express";
import { statusCodes } from "./constants";
import { CommonResponse } from "../types/common.type";
const returnResponse = (responseData: any, res: Response) => {
  const { status, message, data, success }: CommonResponse = responseData;
  switch (status) {
    case statusCodes.SUCCESS:
      res.status(status).json({ message, data, success });
      break;
    case statusCodes.CREATED:
      res.status(status).json({ message, data, success });
      break;
    case statusCodes.BAD_REQUEST:
      res.status(status).json({ message, data, success });
      break;
    case statusCodes.UNAUTHORIZED:
      res.status(status).json({ message, data, success });
      break;
    case statusCodes.FORBIDDEN:
      res.status(status).json({ message, data, success });
      break;
    case statusCodes.NOT_FOUND:
      res.status(status).json({ message, data, success });
      break;
    case statusCodes.INTERNAL_SERVER_ERROR:
      res.status(status).json({ message, data, success });
      break;
    default:
      res.status(status).json({ message, data, success });
      break;
  }
};

export { returnResponse };
