const { json } = require('express')
//const { databaseConnection } = require('../index')
const pool = require("../connection")

module.exports.insert = async (post) => {
    const { title, message } = post
    try{
        const query = await pool.query(`INSERT INTO post (title, message) VALUES ($1, $2)`, [title, message])
        //const postResult = Response.json({ status: 'success', message: 'Data inserted successfully.' })
        return JSON.stringify({ 
            status: 'success', 
            prompt: 'Data inserted successfully.',
            title: `${title}`,
            message: `${message}` 
        })
    } catch (err){
        return err.stack
    }
}