const dotEnv = require("dotenv")

//environment config.
if(process.env.NODE_ENV !== "prod"){
    const configFile = `./.env.${process.env.NODE_ENV}`
    dotEnv.config({path: configFile})
}else{
    dotEnv.config()
}

module.exports = {
    PORT: process.env.PORT,
    postgres: require('./postgres'),
    authToken: require('./auth-token'),
    // Todo: debezium.json file should use environment variables instead to differentiate between dev and prod env
}