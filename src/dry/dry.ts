import { Response } from "express";

export const success = (
  res: Response,
  number: number,
  msg: string,
  token?: string,
  data?: any
) => {
  res.status(number).json({
    msg: msg,
    success: true,
    token: token ? token : "",
    data: data ?data : ['nothing to show'],
  });
};
export const failed = (
  res: Response,
  number: number,
  msg: string,
  err?: string
) => {
  res.status(number).json({
    msg: msg,
    success: false,
    error: err,
  });
};
