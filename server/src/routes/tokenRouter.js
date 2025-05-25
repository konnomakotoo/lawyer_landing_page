const verifyRefreshToken = require("../middlewares/verifyRefreshToken");
const generateTokens = require("../config/generateTokens");
const jwtConfig = require("../config/jwtConfig");

const tokenRoutes = require("express").Router();

tokenRoutes.get("/refresh", verifyRefreshToken, (req, res) => {
const { accessToken, refreshToken } = generateTokens(res.locals.user);

res
.cookie("refreshToken", refreshToken, {
httpOnly: true,
maxAge: jwtConfig.refreshToken.expireIn,
})
.json({ accessToken, user: res.locals.user });
});

module.exports = tokenRoutes;