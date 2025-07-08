import {Router} from "express";
import {createFileLink, fileHandler, getFileByid, downloadfile} from "../controllers/file.contollers";
import multer from "multer";
import {authorize} from "../middlewares/auth.middlmares";

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const fileRouter = Router();

fileRouter.post("/upload", authorize, upload.single("file"), fileHandler);
fileRouter.get("/downloady/:id", authorize, getFileByid);
fileRouter.post("/createlink/", createFileLink)
fileRouter.post("/downloadf/:id", downloadfile)
fileRouter.get("/download/:id", getFileByid);

export default fileRouter;
