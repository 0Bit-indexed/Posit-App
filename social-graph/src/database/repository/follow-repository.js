const pool = require('../connection')
const { FollowQuery } = require('../operations')
const { FollowManipulation } = require('../operations')

class FollowRepository{
    async FindPostById(id){
        const existingPost = await PostQuery.findById(id)
        return existingPost
    }

    async insertFollowRequest(request){
        const followRequestResult = await FollowManipulation.insertFollowRequest(request)
        return followRequestResult
    }

    async deleteFollowRequest(request){
        const result = await FollowManipulation.deleteFollowRequest(request)
        return result
    }

    async deleteAllFollowRequest(request){
        const result = await FollowManipulation.deleteAllFollowRequest(request)
        return result
    }

    async updateFollowRequest(request){
        const result = await FollowManipulation.updateFollowRequest(request)
        return result
    }

    async deleteFollow(request){
        const result = await FollowManipulation.deleteFollow(request)
        return result
    }

    async insertfollow(request){
        const result = await FollowManipulation.insertfollow(request)
        return result
    }

    async FindAllFollowers(accountId){
        const followers = await FollowQuery.FindAllFollowers(accountId)
        return followers
    }

    async FindAllFollowing(accountId){
        const following = await FollowQuery.FindAllFollowing(accountId)
        return following
    }

    async FindAllIncomingFollowRequests(recipientId){
        const FollowRequests = await FollowQuery.FindAllIncomingFollowRequests(recipientId)
        return FollowRequests
    }

    async FindAllOutgoingFollowRequests(accountId){
        const FollowRequests = await FollowQuery.FindAllOutgoingFollowRequests(accountId)
        return FollowRequests
    }


}

module.exports = FollowRepository