// const Redis = require("ioredis");

// const redisHost = 'user-post-cache';

// const userPost_RedisClient = new Redis({
//   host: redisHost,
//   port: 6379
// });

//TODO: switch to a class structure instead of functional
const userPost_RedisClient = require("./connection");

module.exports.RetrievePostById = async (id) => {
    try{
        const postData = await userPost_RedisClient.get(id) //todo: maybe change postData to cacheValue and id to cacheKey
        //console.log("🚀 ~ file: data-retrieval.js:14 ~ userPost_RedisClient.get ~ post:", JSON.parse(postData))
        return JSON.parse(postData)
    } catch (err){
        return err.stack
    }
}

module.exports.CachePost = async (cacheKey, cacheValue) => {
    const TIMEOUT = 3600 
    try{
        await userPost_RedisClient.setex(cacheKey, TIMEOUT, cacheValue);
    } catch (err){
        console.log(err.stack)
    }
}