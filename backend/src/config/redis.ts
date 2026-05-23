import Redis from "ioredis";

// If REDIS_URL is provided (for Upstash), use it; otherwise use individual parameters
const redis = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: null,
    })
  : new Redis({
      host: process.env.REDIS_HOST || "localhost",
      port: parseInt(process.env.REDIS_PORT || "6379"),
      password: process.env.REDIS_PASSWORD || undefined,
      maxRetriesPerRequest: null,
      // Enable TLS for cloud-based Redis (like Upstash)
      tls: process.env.REDIS_HOST?.includes("upstash") ? {} : undefined,
    });

redis.on("connect", () => {
  console.log("✅ Redis connected successfully");
});

redis.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

export default redis;
