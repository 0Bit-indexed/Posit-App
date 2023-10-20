const jwt = require('jsonwebtoken')
const { GenerateAccessToken } = require('../utils')
const AuthService = require('../services/auth-services')


module.exports = (app) => {
    const service = new AuthService()
    
    app.post('/signup', async (req,res,next) => {

        const data = await service.registerUser(req.body)
        return res.status(200).json(data)
    })

    app.post('/login', async (req,res,next) => {

        const data = await service.authenticate(req.body)
        return res.status(200).json(data)
    })
    
    app.get("/", (req, res, next) =>{
        return res.status(200).json({"msg": "in account"})
    })
    
}