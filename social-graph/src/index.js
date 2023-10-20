const express = require("express")
const {PORT} = require("./config")
const expressApp = require('./express-app')

const StartServer = async() => {

    const app = express();
    
    await expressApp(app);
    

    app.listen(PORT, () => {
          console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
    .on('close', () => {
        channel.close();
    })
    

}

StartServer();










// const app = express()

// app.use(express.json())

// app.use("/", (req, res, next) =>{
//     return res.status(200).json({"msg": "in post"})
// })

// // app.get("/", (req, res) => {
// //     res.send("<h2> social graph </h2>")
// // })


// app.listen(PORT, () => console.log(`listening on port ${PORT}`))