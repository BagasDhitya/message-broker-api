import { createClient } from "redis";

const client = createClient();

client.on("error", (err) => console.error("Redis Client Error", err));

client.connect();

export const sendMessage = async (
  channel: string,
  message: string
): Promise<void> => {
  await client.publish(channel, message);
};

export const receiveMessage = (
  channel: string,
  callback: (message: string) => void
): void => {
  client.subscribe(channel, (message) => {
    callback(message);
  });
};
