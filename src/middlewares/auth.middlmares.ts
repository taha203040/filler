import { failed, success } from "../dry/dry";
import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import { SECRET_KEY } from "../config/env";
import User from "../models/user.model";
export const authorize = async (
  req: Request,
  res: Response,
  next: Function
) => {
  let token;
  try {
    if (
      req.headers.authorization ||
      req.headers.authorization?.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    console.log(SECRET_KEY ,'hi')
    if (!token) {
      failed(res, 404, "token not provider ");
    }
    const decoded = jwt.verify(token as string, SECRET_KEY as string);
    //@ts-ignore
    const user = await User.findById(decoded.id);
    if (!user) failed(res, 404, "unAuthorized ");
    //@ts-ignore
    req.user = user;
    success(res, 200, "success");
    next();
  } catch (err) {
    failed(res, 403, "Not allowed", err as string);
  }
};
