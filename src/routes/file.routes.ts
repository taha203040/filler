import { Router } from "express";
import { fileHandler, getFileByid } from "../controllers/file.contollers";
import multer from "multer";
const storage = multer.memoryStorage();
 const upload = multer({ storage: storage });

const fileRouter = Router();

fileRouter.post("/upload", upload.single("file"), fileHandler);
fileRouter.get("/download/:id", getFileByid);
export default fileRouter;
