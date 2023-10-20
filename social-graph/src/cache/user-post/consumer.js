const { Kafka } = require("kafkajs");
const { SchemaRegistry } = require("@kafkajs/confluent-schema-registry");
//const {userPost_RedisClient} = require("../connection");
//const userPost_RedisClient = require("./connection");
const { PostCache } = require("../index")

const kafka = new Kafka({
  clientId: "post-cache-consumer",
  brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: "userPost-group" });

const schemaRegistry = new SchemaRegistry({ host: "http://schema-registry:8081" });
// const redisHost = 'user-post-cache';

// const userPost_RedisClient = new Redis({
//   host: redisHost,
//   port: 6379
// });

const main = async () => {
  await consumer.connect();

  await consumer.subscribe({ topic: "post_db_dev_server.public.post", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      //console.log("🚀 ~ file: consumer.js:402 ~ eachMessage: ~ message:", message)
      try {
        const decodedMessage = await schemaRegistry.decode(message.value);
        console.log("Decoded message:", decodedMessage);
        //const cacheKey = `post:${message.value.id}`;
        const cacheKey = `${decodedMessage.after.id}`;
        const cacheValue = JSON.stringify(decodedMessage.after);
        //console.log("🚀 ~ file: consumer.js:417 ~ eachMessage: ~ cacheKey:", cacheKey)
        // await userPost_RedisClient.setex(cacheKey, 3600, cacheValue);
        await PostCache.CachePost(cacheKey, cacheValue);
        
      } catch (error) {
        console.error("Error decoding message:", error);
      }
    },
  });
};

main().catch(console.error);
