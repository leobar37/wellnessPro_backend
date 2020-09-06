import { NextFunction, ErrorRequestHandler } from "express";
export const errorHandler: ErrorRequestHandler = (
  err: any,
  req,
  res,
  next: NextFunction
): void => {
  res.status(400).json({ ok: false, message: err.message });
};
