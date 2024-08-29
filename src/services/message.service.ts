import { createClient } from "redis";

const pubClient = createClient(); // For publishing messages
const subClient = createClient(); // For subscribing to messages

pubClient.on("error", (err) =>
  console.error("Redis Publish Client Error", err)
);
subClient.on("error", (err) =>
  console.error("Redis Subscribe Client Error", err)
);

pubClient.connect();
subClient.connect();

export const sendMessage = async (
  channel: string,
  message: string
): Promise<void> => {
  await pubClient.publish(channel, message);
};

export const receiveMessage = (
  channel: string,
  callback: (message: string) => void
): void => {
  subClient.subscribe(channel, (message) => {
    callback(message);
  });
};
