const UserAuth = require("./middleware/auth");
const communityService = require('../services/community-services')

module.exports = (app) => {
    const service = new communityService()

    app.post('/thread', UserAuth, async (req,res,next) => {
        const accountId = req.user.id;

        const data = await service.createThread(accountId, req.body)
        return res.status(200).json(data)
    })
    
    app.get("/", (req, res, next) =>{
        return res.status(200).json({"msg": "in community"})
    })
    
}