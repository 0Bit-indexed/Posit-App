const pool = require('../connection')
const { PostQuery } = require('../operations')
const { PostManipulation } = require('../operations')

class PostRepository{
    async FindPostById(id){
        const existingPost = await PostQuery.findById(id)
        return existingPost
    }

    async FindAllPosts(){
        const existingPosts = await PostQuery.findAll()
        return existingPosts
    }

    async insertPost(post){
        //Todo: data validation be done at the repository layer! (bc multiple business functions call repository layer functions)
        //const { title, message } = post
        const postResult = await PostManipulation.insert(post)
        return postResult
    }

}

module.exports = PostRepository