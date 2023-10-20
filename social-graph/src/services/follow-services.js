const { FollowRepository } = require("../database")
//const {FormateData} = require('../utils');
const { FollowCache } = require("../cache")

//business logic 
class FollowService{

    constructor(){
        this.repository = new FollowRepository()
        this.cache = FollowCache
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

    async createFollowRequest(userInput){
        const { accountId, recipientId } = userInput
        
        if (accountId != recipientId) {
            //TODO:check if accountid already following recipientid and that recipientid exists first
            const followRequestResult = await this.repository.insertFollowRequest({accountId, recipientId})
            return followRequestResult
        }
        return "attempting to self follow: not possible"
    }

    async removeFollowRequest(userInput){
        const { accountId, recipientId } = userInput
        if (accountId != recipientId) {
            const result = await this.repository.deleteFollowRequest({accountId, recipientId})
            return result
        }
        return "attempting to remove self follow: not possible"
    }

    async removeAllFollowRequest(userInput){
        const { recipientId } = userInput
        const result = await this.repository.deleteAllFollowRequest({recipientId})
        return result
    }

    async approveFollowRequest(userInput){
        const { accountId, recipientId } = userInput
        const approvedAt = new Date()

        if (accountId != recipientId) {
            //*: currently it will update the follow request even if already approved
            const Result = await this.repository.updateFollowRequest({accountId, recipientId, approvedAt})
            return Result
        }
        return "attempting to approve a self follow: not possible"
    }

    async unfollow(userInput){
        const { accountId, recipientId } = userInput
        const result = await this.repository.deleteFollow({accountId, recipientId})
        return result
    }

    async follow(userInput){
        const { accountId, recipientId } = userInput
        const approvedAt = new Date()
        //Todo: check if accountid requested to follow  (and if isApproved false). if yes, updateFollowRequest. else below
        const result = await this.repository.insertfollow({accountId, recipientId, approvedAt})
        return result
    }

    async getFollowers(userInput){
        const accountId = userInput
        const followers = await this.repository.FindAllFollowers(accountId);
        return followers 
    }

    async getFollowing(userInput){
        const accountId = userInput
        const followers = await this.repository.FindAllFollowing(accountId);
        return followers 
    }

    async getIncomingFollowRequests(userInput){
        const recipientId = userInput
        const FollowRequests = await this.repository.FindAllIncomingFollowRequests(recipientId);
        return FollowRequests 
    }

    async getOutgoingFollowRequests(userInput){
        const accountId = userInput
        const FollowRequests = await this.repository.FindAllOutgoingFollowRequests(accountId);
        return FollowRequests 
    }


}

module.exports = FollowService
