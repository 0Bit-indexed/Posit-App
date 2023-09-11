const Redis = require("ioredis");

const redisHost = 'user-post-cache';

const userPost_RedisClient = new Redis({
  host: redisHost,
  port: 6379
});

module.exports = userPost_RedisClient

