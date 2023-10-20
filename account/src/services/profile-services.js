const { ProfileRepository } = require("../database");

const { GeneratePassword, GenerateSalt, GenerateAccessToken, ValidatePassword } = require('../utils');

//business logic 
class ProfileService{

    constructor(){
        this.repository = new ProfileRepository()
    }

}

module.exports = ProfileService
