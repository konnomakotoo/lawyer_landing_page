const router = require("express").Router();
const authController = require("../controllers/authController");
const verifyAccessToken = require("../middlewares/verifyAccessToken");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/current", verifyAccessToken, authController.protectedRoute);

module.exports = router;
