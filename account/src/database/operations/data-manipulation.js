const { json } = require('express')
//const { databaseConnection } = require('../index')
const pool = require("../connection")

module.exports.insertUser = async (user) => {
    const { email, username, displayName, password, registeredAt, salt }  = user
    try{
        const query = await pool.query(`INSERT INTO users (email, username, displayName, password, registeredAt, salt) VALUES ($1, $2, $3, $4, $5, $6)`, [email, username, displayName, password, registeredAt, salt])
        //const registryResult = Response.json({ status: 'success', message: 'Data inserted successfully.' })
        return JSON.stringify({ 
            status: 'success', 
            prompt: 'Data inserted successfully.',
            email: `${email}`,
            username: `${username}`,
            displayName: `${displayName}`,
            registeredAt: `${registeredAt}` 
        })
    } catch (err){
        return err.stack
    }
}

module.exports.insertProfile = async (profile) => {
    const { accountId, account_type, aboutMe }  = profile
    try{
        const query = await pool.query(`INSERT INTO profile (accountId, account_type, aboutMe) VALUES ($1, $2, $3)`, [accountId, account_type, aboutMe])
        //const registryResult = Response.json({ status: 'success', message: 'Data inserted successfully.' })
        return JSON.stringify({ 
            status: 'success', 
            prompt: 'Data inserted successfully.',
            accountId: `${accountId}`,
            account_type: `${account_type}`,
            aboutMe: `${aboutMe}`
        })
    } catch (err){
        return err.stack
    }
}