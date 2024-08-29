import { Request, Response, NextFunction } from "express";

export const validateMessage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { channel, message } = req.body;
  if (!channel || !message) {
    return res.status(400).send("Channel and message are required");
  }
  next();
};
