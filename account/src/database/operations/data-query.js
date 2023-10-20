const { json } = require('express')
//const { databaseConnection } = require('../index')
const pool = require("../connection")

module.exports.findByUsername = async (username) => {
    try{
        const query = await pool.query(`SELECT * FROM users WHERE username = $1`, [username])
        return query.rows
    } catch (err){
        return err.stack
    }
}

module.exports.findAll = async () => { 
    try{
        const query = await pool.query("SELECT * FROM users")
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
