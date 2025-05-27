require('dotenv').config();
const AuthService = require("../services/authService");
const jwtConfig = require("../config/jwtConfig");

async function signup(req, res, next) {
  try {
    const { userData, accessToken, refreshToken } = await AuthService.signup(req.body);

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: jwtConfig.refreshToken.expireIn,
      })
      .status(201)
      .json({ user: userData, accessToken });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { userData, accessToken, refreshToken } = await AuthService.login(req.body);

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: jwtConfig.refreshToken.expireIn,
      })
      .json({ user: userData, accessToken });
  } catch (err) {
    next(err);
  }
}

function logout(req, res) {
  res.clearCookie("refreshToken");
  res.status(204).send(); // No Content
}

function protectedRoute(req, res) {
  res.json({ user: res.locals.user });
}

module.exports = { signup, login, logout, protectedRoute };
