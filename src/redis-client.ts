import { createClient } from "redis";

// Publisher & Subscriber clients instances
const publisher = createClient({
  url: process.env.REDIS_URL as string,
  socket: {
    connectTimeout: 50_000,
  },
});
const subscriber = publisher.duplicate();

// Connection error handling
publisher.on("error", (error) => {
  console.log(`The Redis publisher client failed to connect ...`);
  throw error;
});
subscriber.on("error", (error) => {
  console.log(`The Redis subscriber client failed to connect ...`);
  throw error;
});

export { publisher, subscriber };
