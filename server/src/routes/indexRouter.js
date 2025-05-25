const authRouter = require("./authRouter");
const tokenRoutes = require("./tokenRouter");
const indexRoutes = require("express").Router();

indexRoutes.use("/auth", authRouter);
indexRoutes.use("/tokens", tokenRoutes);

module.exports = indexRoutes;