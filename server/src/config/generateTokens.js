require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtConfig = require("./jwtConfig");


function generateTokens(user) {
const { exp, iat, ...rest } = user;

return {
accessToken: jwt.sign(rest, process.env.ACCESS_KEY, {
expiresIn: jwtConfig.accessToken.expireIn,
}),
refreshToken: jwt.sign(rest, process.env.REFRESH_KEY, {
expiresIn: jwtConfig.refreshToken.expireIn,
}),
};
}

module.exports = generateTokens;