import { Router } from "express";

import {
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/user.controllers";
const userRouter = Router();

userRouter.get("/user", getUser);
userRouter.post("/user/create/", createUser);
userRouter.delete("/user/delete/:id", deleteUser);
userRouter.put("/user/update/:id", updateUser);
export default userRouter;
