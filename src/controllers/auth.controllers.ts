import { Request, Response } from "express";
import { failed, success } from "../dry/dry";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { comparPassword, hashPassword } from "../utils/hashing";
import { SECRET_KEY } from "../config/env";
import mongoose from "mongoose";
export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return failed(
        res,
        400,
        "email and password are required",
        "missing credentials"
      );
    const userNotfound = await User.findOne({ email });
    if (!userNotfound)
      return failed(res, 404, "user not found", "user not found");
    const isMatch = await comparPassword(password, userNotfound.password);
    if (!isMatch)
      return failed(res, 401, "invalid credentials", "invalid credentials");
    const token = jwt.sign(
      {
        id: userNotfound._id,
        email: userNotfound.email,
      },
      'alskdjfasdflaksjfhjkalsdfjdjskksjddj' as string,
      {
        expiresIn: "1h", // token will expire in 1 hour
      }
    );
    success(res, 200, "sign in successful", token);
  } catch (err) {
    failed(res, 500, "internal server error", err as string);
    console.error("Error in signIn:", err);
  }
};
export const signUp = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  try {
    const { email, password, username } = req.body

    if (!email || !password || !username) {
      return failed(res, 400, "email, password and username are required", "missing credentials");
    }

    await session.withTransaction(async () => {
      // التحقق من وجود المستخدم ضمن نفس الجلسة
      const userExist = await User.findOne({ email }).session(session);
      if (userExist) {
        throw new Error("UserAlreadyExists");
      }

      const hashedPassword = await hashPassword(password);

      const newUser = new User({
        email,
        password: hashedPassword,
        username,
      });

      await newUser.save({ session });
    });

    success(res, 201, "User created successfully");
  } catch (error) {
    if ((error as Error).message === "UserAlreadyExists") {
      return failed(res, 409, "User already exists", "user already exists");
    }
    failed(res, 500, "Internal server error", (error as Error).message);
  } finally {
    session.endSession();
  }
};
export const logout = async (req: Request, res: Response) => {};
export const getMe = async (req: Request, res: Response) => {};
