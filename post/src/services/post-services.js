const { PostRepository } = require("../database")
//const {FormateData} = require('../utils');
const { PostCache } = require("../cache")

//business logic 
class PostService{

    constructor(){
        this.repository = new PostRepository()
        this.cache = PostCache
    }
    
    async getPost(id){
        var post;
        const cachedPost = await this.cache.RetrievePostById(id);

        if (cachedPost) {
            post = cachedPost
            console.log("🚀 ~ file: post-services.js:17 ~ PostService ~ getPost ~ cachedPost:", cachedPost)
        }else{
            //TODO: null check needed on existing post
            const existingPost = await this.repository.FindPostById(id);
            post = existingPost
            console.log("🚀 ~ file: post-services.js:21 ~ PostService ~ getPost ~ existingPost:", existingPost)
            await this.cache.CachePost(id, JSON.stringify(post))
        }

        return post;
    }

    // async getPost(id){
    //     const existingPost = await this.repository.FindPostById(id);
    //     return existingPost
    // }

    async getAllPosts(){
        const existingPosts = await this.repository.FindAllPosts();
        return existingPosts //need to format the data being sent
    }

    async createPost(userInput){
        //TODO: create a data class called post and validate userInput is post data
        const { title, message } = userInput
        const postResult = await this.repository.insertPost(userInput)
        return postResult
    }

}

module.exports = PostService
