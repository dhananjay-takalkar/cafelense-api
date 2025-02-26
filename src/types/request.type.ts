import { Request } from "express";

interface RequestWithUser extends Request {
  user?: any;
}

export { RequestWithUser };
