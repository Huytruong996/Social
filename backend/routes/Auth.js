const router = require("express").Router();

const refreshTokenController = require("../controller/Auth/RefreshToken");

router.post("/refreshToken", refreshTokenController);

module.exports = router;
