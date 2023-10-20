const { CommunityRepository } = require("../database")
//const {FormateData} = require('../utils');
const { CommunityCache } = require("../cache")

//business logic 
class CommunityService{

    constructor(){
        this.repository = new CommunityRepository()
        this.cache = CommunityCache
    }
    
    async getPost(id){
        var post;
        const cachedPost = await this.cache.RetrievePostById(id);

        if (cachedPost) {
            post = cachedPost
            console.log("🚀 ~ file: post-services.js:17 ~ PostService ~ getPost ~ cachedPost:", cachedPost)
        }else{
            const existingPost = await this.repository.FindPostById(id);
            post = existingPost
            if (Object.keys(post).length != 0) {
                console.log("🚀 ~ file: post-services.js:21 ~ PostService ~ getPost ~ existingPost:", existingPost)
                await this.cache.CachePost(id, JSON.stringify(post))
            }
        }

        return post;
    }

    async createThread(accountId, userInput){
        const { title, statusId } = userInput
        const community = await this.repository.FindCommunity(adminId)
        const communityId = community[0].id

        //if community id not null code below
        const result = await this.repository.insertThread({title, statusId, communityid})
        return result
    }
    
    async getCommunity(adminId){
        const community = await this.repository.FindCommunity(adminId)
        return community 
    }


}

module.exports = CommunityService
