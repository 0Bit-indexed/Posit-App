
const PostService = require('../services/post-services')

module.exports = (app) => {
    const service = new PostService()

    app.get('/',async (req,res,next) => {
        console.log("hi")
        const data = await service.getAllPosts()
        return res.status(200).json(data)
    })


    app.get('/:id',async (req,res,next) => {
        const id = req.params.id
        const data = await service.getPost(id)
        return res.status(200).json(data)
    })

    app.post('/',async (req,res,next) => {
        //const { title } = req.body
        //const { message } = req.body
        const data = await service.createPost(req.body)
        //console.log(`${title} : ${message}`)
        return res.status(200).json(data)
    })


    // app.get("/", (req, res) => {
    //     res.send("<h2> post service </h2>")
    // })
    
}