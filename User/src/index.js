const express = require("express")
const dotEnv = require("dotenv").config()
const app = express()

const jwt = require('jsonwebtoken')

const posts = [
    {
        username: 'jay',
        title: 'post 1'
    },
    {
        username: 'kim',
        title: 'post 2'
    }
]

app.use(express.json())

//TODO: make middleware folder
const authenticateToken = (req, res, next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }

        req.user = user
        next()
    })
}

app.get('/posts', authenticateToken, (req, res, next) =>{
    res.json(posts.filter(post => post.username === req.user.username))
})

app.use("/", (req, res, next) =>{
    return res.status(200).json({"msg": "in auth"})
})

const port = process.env.PORT || 3003

app.listen(port, () => console.log(`listening on port ${port}`))
