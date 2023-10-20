const pool = require('../connection')
const { CommunityQuery } = require('../operations')
const { CommunityManipulation } = require('../operations')

class FollowRepository{
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

    async FindAllFollowing(accountId){
        const following = await FollowQuery.FindAllFollowing(accountId)
        return following
    }


}

module.exports = FollowRepository