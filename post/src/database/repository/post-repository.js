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
        //Todo: should data validation be done at the service or repository layer?
        //const { title, message } = post
        const postResult = await PostManipulation.insert(post)
        return postResult
    }

}

module.exports = PostRepository