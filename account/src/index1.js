const express = require("express")
const dotEnv = require("dotenv").config()
const app = express()
const { authToken } = require("./config/index")
const jwt = require('jsonwebtoken')
const { 
    GenerateAccessToken,
    GenerateRefreshToken
} = require('./utils')

app.use(express.json())

// //TODO: make middleware folder
// const authenticateToken = (req, res, next) =>{ //ValidateSignature
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]

//     if (token == null) return res.sendStatus(401)

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) {
//             return res.sendStatus(403)
//         }

//         req.user = user
//         next()
//     })
// }


app.post('/login', async (req, res, next) =>{
    //ToDO: Authenticate User

    //create token
    const username =req.body.username
    const user = {name: username}

    const accessToken = await GenerateAccessToken(user)
    res.json({accessToken: accessToken})
})

app.use("/", (req, res, next) =>{
    return res.status(200).json({"msg": "in auth"})
})

const port = process.env.PORT || 3003

app.listen(port, () => console.log(`listening on port ${port}`))
