require("dotenv").config();
const jwt = require("jsonwebtoken");

function verifyRefreshToken(req, res, next) {
try {
const { refreshToken } = req.cookies;
const payload = jwt.verify(refreshToken, process.env.REFRESH_KEY);
res.locals.user = payload;
next();
} catch (error) {
console.log("ERROR VERIFY REFRESH: ", error);
res.sendStatus(500);
}
}

module.exports = verifyRefreshToken;