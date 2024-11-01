import { createClient } from "redis";

const pubClient = createClient(); // For publishing messages
const subClient = createClient(); // For subscribing to messages

pubClient.on("error", (err) =>
  console.error("Redis Publish Client Error", err)
);
subClient.on("error", (err) =>
  console.error("Redis Subscribe Client Error", err)
);

// Connect clients
(async () => {
  try {
    await pubClient.connect();
    await subClient.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
})();

export const sendMessage = async (
  channel: string,
  message: string
): Promise<void> => {
  if (typeof channel !== "string" || typeof message !== "string") {
    throw new TypeError("Channel and message must be strings.");
  }

  console.log(`Publishing message: "${message}" to channel: "${channel}"`);
  await pubClient.publish(channel, message);
};

export const receiveMessage = (
  channel: string,
  callback: (message: string) => void
): void => {
  console.log(`Subscribing to channel: "${channel}"`);
  subClient.subscribe(channel, (message) => {
    console.log(`Received message from channel "${channel}": ${message}`);
    callback(message);
  });
};
