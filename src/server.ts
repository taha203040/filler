import express from "express";
import userRouter from "./routes/user.routes";
import { connectToDatabase } from "./config/database";
import { PORT } from "./config/env";
import fileRouter from "./routes/file.routes";
import authRouter from "./routes/auth.routes";
const app = express();
app.use(express.json());
app.use("/api/v1/files/", fileRouter);
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/auth/", authRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDatabase();
});
