const express = require("express")
const cors = require("cors")
const proxy = require("express-http-proxy")
const app = express()

app.use(cors())
app.use(express.json())

app.use("/post", proxy("http://localhost:3001"))
app.use("/social-graph", proxy("http://localhost:3002"))
app.use("/account", proxy("http://localhost:3003"))
app.use("/community", proxy("http://localhost:3004"))

app.get("/", (req, res) => {
    res.send("<h2> Posit Gateway </h2>")
})

//TODO: port variable not imported
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`gateway listening on port ${port}`))