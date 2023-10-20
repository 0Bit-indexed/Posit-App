const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { authToken } = require("../config/index")

module.exports.GenerateAccessToken = async (payload) => {
    try {
      return await jwt.sign(payload, authToken.SECRET, { expiresIn: "30d" });
    } catch (error) {
      console.log(error);
      return error;
    }
};

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

module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};







// module.exports.GenerateRefreshToken = async (payload) => {
//     try {
//       return await jwt.sign(payload, authToken.SECRET);
//     } catch (error) {
//       console.log(error);
//       return error;
//     }
// };
  
  
//   //TODO: converge validate with authenticatetoken
//   module.exports.ValidateAccessToken = async (req) => {
//     try {
//       const signature = req.get("Authorization");
//       console.log(signature);
//       const payload = await jwt.verify(signature.split(" ")[1], authToken.SECRET);
//       req.user = payload;
//       return true;
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   };

//   const authenticateToken = (req, res, next) =>{
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]

//     if (token == null) return res.sendStatus(401)

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) {
//             return res.sendStatus(403)
//         }

//         req.user = user
//         next()
//     })
// }