const pool = require('../connection')
const { UserQuery } = require('../operations')
const { UserManipulation } = require('../operations')

class ProfileRepository{

    async insertProfile(profile){
        const profileResult = await UserManipulation.insertProfile(profile)
        return profileResult
    }

}

module.exports = ProfileRepository