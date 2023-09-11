const express = require("express")

const app = express()

app.use(express.json())

app.use("/", (req, res, next) =>{
    return res.status(200).json({"msg": "in social graph"})
})

// app.get("/", (req, res) => {
//     res.send("<h2> social graph </h2>")
// })


const port = process.env.PORT || 3002

app.listen(port, () => console.log(`listening on port ${port}`))