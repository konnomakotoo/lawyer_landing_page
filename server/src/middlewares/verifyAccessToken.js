require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../../db/models");

async function verifyAccessToken(req, res, next) {
try {
const data = req.headers.authorization.split(" ")[1];
const payload = jwt.verify(data, process.env.ACCESS_KEY);
const user = await User.findOne({ where: {id: payload.id}})

res.locals.user = user;
next();
} catch (error) {
console.log("ERROR VERIFY ACCESS: ", error);
res.sendStatus(401);
}
}

module.exports = verifyAccessToken;