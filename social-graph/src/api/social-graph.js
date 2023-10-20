const UserAuth = require("./middleware/auth");
const FollowService = require('../services/follow-services')

module.exports = (app) => {
    const service = new FollowService()

    app.post('/follow-request/:id', UserAuth, async (req,res,next) => {
        const accountId = req.user.id;
        const recipientId = req.params.id;

        const data = await service.createFollowRequest({accountId, recipientId})
        return res.status(200).json(data)
    })

    app.delete('/follow-request/:id/:isIncoming', UserAuth, async (req, res) => {
        //!!: cant be used in production. isIncoming true allows a user to alter a different users data! incoming and outgoing must be seperate calls
        let accountId = req.user.id;
        let recipientId = req.params.id;
        const isIncoming = req.params.isIncoming;

        let data =  null

        if (isIncoming == 'true') {
            const id = accountId
            accountId = recipientId
            recipientId = id

            data = await service.removeFollowRequest({accountId, recipientId})
        } else if (isIncoming == 'false') {
            data = await service.removeFollowRequest({accountId, recipientId})
        }else{
            data = `isIncomplete should be true or false. not accepted: ${isIncoming}`
        }

        return res.status(200).json(data)
    })

    // app.delete('/follow-request/:id', UserAuth, async (req, res) => {
    //     const accountId = req.user.id;
    //     const recipientId = req.params.id;

    //     const data = await service.removeFollowRequest({accountId, recipientId})
    //     return res.status(200).json(data)
    // })

    app.delete('/follow-requests', UserAuth, async (req, res) => {
        const recipientId = req.user.id;

        const data = await service.removeAllFollowRequest({recipientId})
        return res.status(200).json(data)
    })

    app.patch('/follow-request/:id', UserAuth, async (req,res,next) => {
        const recipientId = req.user.id;
        const accountId = req.params.id;

        const data = await service.approveFollowRequest({accountId, recipientId})
        return res.status(200).json(data)
    })

    app.delete('/unfollow/:id', UserAuth, async (req, res) => {
        const accountId = req.user.id;
        const recipientId = req.params.id;

        const data = await service.unfollow({accountId, recipientId})
        return res.status(200).json(data)
    })

    app.post('/follow/:id', UserAuth, async (req, res) => { //!!: should only exist at the service layer. a call shoulnt allow a user to auto follow another user
        const accountId = req.user.id;
        const recipientId = req.params.id;

        const data = await service.follow({accountId, recipientId})
        return res.status(200).json(data)
    })

    app.get('/followers', UserAuth, async (req,res,next) => {
        const accountId = req.user.id;

        const data = await service.getFollowers(accountId)
        return res.status(200).json(data)
    })

    app.get('/following', UserAuth, async (req,res,next) => {
        const accountId = req.user.id;

        const data = await service.getFollowing(accountId)
        return res.status(200).json(data)
    })

    app.get('/follow-requests/incoming', UserAuth, async (req,res,next) => {
        const recipientId = req.user.id;

        const data = await service.getIncomingFollowRequests(recipientId)
        return res.status(200).json(data)
    })

    app.get('/follow-requests/outgoing', UserAuth, async (req,res,next) => {
        const accountId = req.user.id;

        const data = await service.getOutgoingFollowRequests(accountId)
        return res.status(200).json(data)
    })

    app.get('/memberships', UserAuth, async (req,res,next) => {
        const accountId = req.user.id;

        const data = await service.getMemberships(accountId)
        return res.status(200).json(data)
    })

    app.get('/members', UserAuth, async (req,res,next) => {
        const adminId = req.user.id;
        const communityId = req.params.id;

        const data = await service.getMembers({adminId, communityId}) //check if user is admin of community, then get/return the member id's
        return res.status(200).json(data)
    })

    app.get('/member/:id', UserAuth, async (req,res,next) => {
        const memberId = req.user.id;
        const communityId = req.params.id;

        const data = await service.isMember({memberId, communityId}) // check if user is a member of a community
        return res.status(200).json(data)
    })

    app.get('/admin', UserAuth, async (req,res,next) => {
        const adminId = req.user.id;

        const data = await service.isAdmin({adminId}) // return communities that the user is admin of
        return res.status(200).json(data)
    })

    app.delete('/member/:id', UserAuth, async (req, res) => {
        const memberId = req.user.id;
        const communityId = req.params.id;

        const data = await service.removeMembership({memberId, communityId})
        return res.status(200).json(data)
    })
    

    app.get("/", (req, res, next) =>{
        return res.status(200).json({"msg": "in social-graph"})
    })
    
}