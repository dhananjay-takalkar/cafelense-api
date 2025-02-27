import { NextFunction, Request, Response } from "express";
import { verifyToken } from "./token";
import { statusCodes } from "./constants";
import { isAuthorized } from "./authorization";
import multer from "multer";

const validateToken = (req: Request, res: any, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(statusCodes.UNAUTHORIZED).json({
      status: statusCodes.UNAUTHORIZED,
      message: "Unauthorized",
      success: false,
    });
  }
  const decoded = verifyToken(token) as any;
  if (!decoded) {
    return res.status(statusCodes.UNAUTHORIZED).json({
      status: statusCodes.UNAUTHORIZED,
      message: "Unauthorized",
      success: false,
    });
  }
  const endpoint: any = req.originalUrl.split("/")[1];
  if (!isAuthorized(endpoint[endpoint.length - 1], decoded.role)) {
    return res.status(statusCodes.FORBIDDEN).json({
      status: statusCodes.FORBIDDEN,
      message: "Forbidden",
      success: false,
    });
  }
  (req as any).user = decoded;
  next();
};

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

// const upload = (req: any, res: any, next: any) => {
//   const file = req.file;
//   if (!file) {
//     return res.status(statusCodes.BAD_REQUEST).json({
//       status: statusCodes.BAD_REQUEST,
//       message: "No file uploaded",
//       success: false,
//     });
//   }
//   next();
// };

export { validateToken, upload };
