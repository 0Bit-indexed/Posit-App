const Pool = require("pg").Pool
//const {postgres} = require('../config')
const {postgres} = require('../config/index')

//post service is currently not configured to handle a situation in which a connection to the postgres database cannot be established
const pool = new Pool({
    user: postgres.USER, 
    password: postgres.PASSWORD, 
    host: postgres.HOST, 
    port: postgres.PORT,
    database: postgres.DATABASE
})

module.exports = pool