const pool = require('../connection')
const { UserQuery } = require('../operations')
const { UserManipulation } = require('../operations')

class AuthRepository{

    async insertUser(user){
        const registryResult = await UserManipulation.insertUser(user)
        return registryResult
    }

    async FindAccountByUsername(username){
        const existingAccount = await UserQuery.findByUsername(username)
        return existingAccount
    }


}

module.exports = AuthRepository