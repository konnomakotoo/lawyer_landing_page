const authRouter = require("./authRouter");
const tokenRoutes = require("./tokenRouter");
const teamRouter = require('./teamRouter')
const categoryRouter = require('./categoryRouter')
const indexRoutes = require("express").Router();

indexRoutes.use("/auth", authRouter);
indexRoutes.use("/tokens", tokenRoutes);
indexRoutes.use('/team', teamRouter)
indexRoutes.use('/categories', categoryRouter)

module.exports = indexRoutes;