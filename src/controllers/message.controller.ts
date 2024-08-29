import { Request, Response } from "express";
import { sendMessage, receiveMessage } from "../services/message.service";

export const publishMessage = async (req: Request, res: Response) => {
  const { channel, message } = req.body;
  await sendMessage(channel, message);
  res.status(200).send(`Message sent to channel ${channel}`);
};

export const subscribeToChannel = (req: Request, res: Response) => {
  const { channel } = req.params;
  receiveMessage(channel, (message) => {
    console.log(`Received message from ${channel}: ${message}`);
  });
  res.status(200).send(`Subscribed to channel ${channel}`);
};
