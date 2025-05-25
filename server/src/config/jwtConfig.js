const jwtConfig = {
accessToken: {
type: "accessToken",
expireIn: `${1000 * 5}`,
},
refreshToken: {
type: "refreshToken",
expireIn:  `${1000 * 60 * 60 * 24}`,
},
};

module.exports = jwtConfig;