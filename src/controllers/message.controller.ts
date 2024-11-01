import { Request, Response } from "express";
import { sendMessage, receiveMessage } from "../services/message.service";

export const publishMessage = async (req: Request, res: Response) => {
  const { channel, message } = req.body;
  await sendMessage(channel, message);
  res.status(200).send(`Message sent to channel ${channel}`);
};

export const subscribeToChannel = (req: Request, res: Response) => {
  const { channel } = req.params;

  res.set({
    "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  try {
    receiveMessage(channel, (message: any) => {
      res.write(`data: ${message}\n\n`);
    });
  } catch (error) {
    console.log("error : ", error);
  }

  // req.on("close", () => {
  //   console.log(`Client closed connection for channel ${channel}`);
  //   res.end();
  // });
};
