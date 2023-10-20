const jwt = require("jsonwebtoken")
const { authToken } = require("../config/index")

module.exports.ValidateAccessToken = async (req) => {
  try {
    const signature = req.headers['authorization']
    //console.log(signature);
    const token = signature && signature.split(' ')[1]
    const payload = await jwt.verify(token, authToken.SECRET)
    req.user = payload
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}


module.exports.FormateData = (data) => {
    if (data) {
      return { data };
    } else {
      throw new Error("Data Not found!");
    }
  };