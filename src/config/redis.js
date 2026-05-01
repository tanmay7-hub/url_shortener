import IORedis from "ioredis";

const client = new IORedis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});

client.on("connect", () => {
  console.log(" Redis connected (cache)");
});

client.on("error", (err) => {
  console.log(" Redis error:", err.message);
});

export default client;
