const { AuthRepository, ProfileRepository } = require("../database");

const { GeneratePassword, GenerateSalt, GenerateAccessToken, ValidatePassword } = require('../utils');

//business logic 
class AuthService{

    constructor(){
        this.repository = new AuthRepository()
        this.profile = new ProfileRepository
    }

    async registerUser(userInput){

        const { email, username, password, displayName } = userInput
        const registeredAt = new Date()

        let salt = await GenerateSalt();
        
        let userPassword = await GeneratePassword(password, salt);
        
        const registryResult = await this.repository.insertUser({ email, username, displayName, password: userPassword, registeredAt, salt});
        
        //registry successful
        if (JSON.parse(registryResult).status === 'success') {
            const existingAccount = await this.repository.FindAccountByUsername(username)
            
            const createProfile = await this.profile.insertProfile({accountId: existingAccount[0].id, account_type: 'personality'})

            const accessToken = await GenerateAccessToken({id: existingAccount[0].id, email: existingAccount[0].email, username: existingAccount[0].username})
            return {registryResult: registryResult, profile: createProfile, accessToken: accessToken} 
        }

        return registryResult

    }

    async authenticate(userInput){

        const { email, username, password } = userInput

        if (username) {
            //*Warning: doesnt account for account type <user, entity, theme>
            const existingAccount = await this.repository.FindAccountByUsername(username)
           
            if (existingAccount.length != 0) {
                const validPassword = await ValidatePassword(password, existingAccount[0].password, existingAccount[0].salt)

                if(validPassword){
                    const accessToken = await GenerateAccessToken({id: existingAccount[0].id, email: existingAccount[0].email, username: existingAccount[0].username})
                    return {id: existingAccount[0].id, username: existingAccount[0].username, accessToken: accessToken} 
                }
            }
        }
        //TODO: email login 

        return "some error"

    }


    

}

module.exports = AuthService
