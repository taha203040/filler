import {Request, Response} from "express";
import {failed, success} from "../dry/dry";
import File from "../models/file.model";
import Link from "../models/link.model";
import {comparPassword, hashPassword} from "../utils/hashing";
// ✅ معالج رفع الملف
export const fileHandler = async (req: Request, res: Response) => {
    if (!req.file) {
        console.error(req.file);
        console.log(req.headers);
        return failed(res, 400, "No file uploaded");
    }

    const {originalname, mimetype, buffer} = req.file as Express.Multer.File;

    const fileDoc = new File({
        filename: originalname,
        contentType: mimetype,
        data: buffer,
    });

    await fileDoc.save();

    return success(res, 200, "File uploaded successfully", fileDoc._id.toJSON());
};

export const getFileByid = async (req: Request, res: Response) => {
    const file = await File.findById(req.params.id);
    console.log(req.params.id);
    if (!file) return failed(res, 404, "File not found");
    console.log(req.headers);
    res.set("Content-Type", file.contentType);
    res.send({msg: "Download is done"});

    success(res, 200, "File downloaded successfully");
};

export const createFileLink = async (req: Request, res: Response) => {
    try {
        const {id, password} = req.body;
        if (!id || !password) failed(res, 404, "Email or password not found");
        const file = await File.findById(id);
        if (!file) failed(res, 404, "file not found");
        const hashedPassword =await hashPassword(password);
        const newLink = new Link({
            password: hashedPassword,
            link: `http://localhost:2000/api/v1/files/download/${id}`,
        });

        await newLink.save();
        success(res, 200, "Link created successfully", '', `http://localhost:2000/api/v1/files/downloadf/${newLink.id}`)

    } catch (err) {
        console.log(err);
        failed(res, 500, "something went wrong", err as string);
    }
};



export const downloadfile = async  (req: Request, res: Response) => {
    try{
        const {id } = req.params;
        const {password} = req.body;
        if (!id || !password) failed(res, 404, "Bad Credentials not found");
        // @ts-ignore
        const linkExist = await Link.findById(id)

        if (!linkExist) failed(res, 404, "Link does not exist");
        // @ts-ignore
        const isMatch = await  comparPassword(password , linkExist.password)
        if (!isMatch) failed(res, 404, "password not match");
        // @ts-ignore
        success(res , 200, 'enjoy link ', '' , linkExist.link)
    }catch(err){
        failed(res, 500, "something went wrong", err as string);
    }
}
// http link ...idfiile ....codeexpired
