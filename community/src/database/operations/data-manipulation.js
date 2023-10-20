const { json } = require('express')
//const { databaseConnection } = require('../index')
const pool = require("../connection")

module.exports.insertFollowRequest = async (request) => {
    const { accountId, recipientId } = request
    try{
        const query = await pool.query(`INSERT INTO following (accountId, recipientId, isApproved) VALUES ($1, $2, FALSE)`, [accountId, recipientId])
        return JSON.stringify({ 
            status: 'success', 
            prompt: 'Data inserted successfully.',
            accountId: `${accountId}`,
            recipientId: `${recipientId}` 
        })
    } catch (err){
        return err.stack
    }
}

module.exports.deleteFollowRequest = async (request) => {
    const { accountId, recipientId } = request
    try{
        const query = await pool.query(
            'DELETE FROM following WHERE accountId = $1 AND recipientId = $2 AND isApproved = FALSE',
            [accountId, recipientId]
          )
        if (query.rowCount != 0) {
            return JSON.stringify({ 
                status: 'success', 
                prompt: 'Data Deleted successfully.',
                accountId: `${accountId}`,
                recipientId: `${recipientId}` 
            })
        }
        return `the accountId ${accountId} doesn't have a request from recipientId ${recipientId}`
    } catch (err){
        return err.stack
    }
}

module.exports.deleteAllFollowRequest = async (request) => {
    const { recipientId } = request
    try{
        const query = await pool.query(
            'DELETE FROM following WHERE recipientId = $1 AND isApproved = FALSE',
            [recipientId]
          )
        if (query.rowCount != 0) {
            return JSON.stringify({ 
                status: 'success', 
                prompt: 'Data Deleted successfully.',
                accountId: `${recipientId}` 
            })
        }
        return `the accountId ${recipientId} doesn't have any incoming follow requests`
    } catch (err){
        return err.stack
    }
}

module.exports.updateFollowRequest = async (request) => {
    const { accountId, recipientId, approvedAt } = request
    try{
        const query = await pool.query(
            'UPDATE following SET isApproved = TRUE, approvedAt = $1 WHERE accountId = $2 AND recipientId = $3',
            [approvedAt, accountId, recipientId]
          )
        if (query.rowCount != 0) {
            return JSON.stringify({ 
                status: 'success', 
                prompt: 'Data updated successfully.',
                accountId: `${accountId}`,
                recipientId: `${recipientId}`,
                approvedAt: `${approvedAt}` 
            })
        }
        return `the recipientId ${recipientId} doesn't have a request from accountId ${accountId}`
    } catch (err){
        return err.stack
    }
}

module.exports.deleteFollow = async (request) => {
    const { accountId, recipientId } = request
    try{
        const query = await pool.query(
            'DELETE FROM following WHERE accountId = $1 AND recipientId = $2 AND isApproved = TRUE',
            [accountId, recipientId]
          )
        if (query.rowCount != 0) {
            return JSON.stringify({ 
                status: 'success', 
                prompt: 'Data Deleted successfully.',
                accountId: `${accountId}`,
                recipientId: `${recipientId}` 
            })
        }
        return `the accountId ${accountId} is not following recipientId ${recipientId}`
    } catch (err){
        return err.stack
    }
}

module.exports.insertfollow = async (request) => {
    const { accountId, recipientId, approvedAt } = request
    try{
        const query = await pool.query(`INSERT INTO following (accountId, recipientId, isApproved, approvedAt) VALUES ($1, $2, TRUE, $3)`, [accountId, recipientId, approvedAt])
        if (query.rowCount != 0) {
            return JSON.stringify({ 
                status: 'success', 
                prompt: 'Data inserted successfully.',
                accountId: `${accountId}`,
                recipientId: `${recipientId}`,
                approvedAt: `${approvedAt}`,  
            })
        }
        return `the accountId ${accountId} couldn't follow recipientId ${recipientId}`
    } catch (err){
        return err.stack
    }
}