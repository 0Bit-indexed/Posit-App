const { json } = require('express')
//const { databaseConnection } = require('../index')
const pool = require("../connection")

module.exports.findById = async (id) => {
    try{
        const query = await pool.query(`SELECT * FROM post WHERE id = ${id}`)
        return query.rows
    } catch (err){
        return err.stack
    }
}

module.exports.FindAllFollowers = async (accountId) => { 
    try{
        const query = await pool.query(
            'SELECT * FROM following WHERE recipientId = $1 isApproved = TRUE',
            [accountId]
          )
        return query.rows
    } catch (err){
        return err.stack
    }
}

module.exports.FindAllFollowing = async (accountId) => { 
    try{
        const query = await pool.query(
            'SELECT * FROM following WHERE accountId = $1 AND isApproved = TRUE',
            [accountId]
          )
        return query.rows
    } catch (err){
        return err.stack
    }
}

module.exports.FindAllIncomingFollowRequests = async (recipientId) => { 
    try{
        const query = await pool.query(
            'SELECT * FROM following WHERE recipientId = $1 AND isApproved = False',
            [recipientId]
          )
        return query.rows
    } catch (err){
        return err.stack
    }
}

module.exports.FindAllOutgoingFollowRequests = async (accountId) => { 
    try{
        const query = await pool.query(
            'SELECT * FROM following WHERE accountId = $1 AND isApproved = False',
            [accountId]
          )
        return query.rows
    } catch (err){
        return err.stack
    }
}










// module.exports.findAll = () => {

//     pool.query("SELECT * FROM post", (error, results) => {
//         if(error) throw error
//         console.log("🚀 ~ file: query:11 ~ module.exports.findAll= ~ results:", results.rows)
//         existingPosts = results.rows
//     }) 

// }





// class PostQuery{
//     async findAll(){
//         const existingPosts = await pool.query(query
//             // "SELECT * FROM post", (error, results) => {
//             // if(error){throw error}
//             // console.log("🚀 ~ file: query:11 ~ module.exports.findAll= ~ results:", results.rows)
//             // return results.rows
//             //}
//         ) 
//         return existingPosts
//     }
    
// }
