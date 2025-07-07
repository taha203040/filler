import { Request, Response } from "express";
import { failed, success } from "../dry/dry";
import File from "../models/file.model";



// ✅ معالج رفع الملف
export const fileHandler = async (req: Request, res: Response) => {
  if (!req.file){
    console.error(req.file);
    console.log(req.headers);
    return failed(res, 400, "No file uploaded")};

  const { originalname, mimetype, buffer } = req.file as Express.Multer.File;

  const fileDoc = new File({
    filename: originalname,
    contentType: mimetype,
    data: buffer,
  });

  await fileDoc.save();

  return success(
    res,
    200, 
    "File uploaded successfully",
    fileDoc._id.toJSON()
  );
};

export const getFileByid = async (req: Request, res: Response) => {
  const file = await File.findById(req.params._id);
  if (!file) return failed(res, 404, "File not found");
  res.set("Content-Type", file.contentType);
  res.send(file.data);
  success(res, 200, "File downloaded successfully");
};
