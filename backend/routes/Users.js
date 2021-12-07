const router = require("express").Router();

//CONTROLLER
const { loginController } = require("../controller/User/Login");
const { registerController } = require("../controller/User/Register");
const { followController } = require("../controller/User/Follow");
const { unfollowController } = require("../controller/User/Unfollow");
const { GetUser } = require("../controller/User/GetUser");
const { LogoutController } = require("../controller/User/Logout");
const { getFriendsController } = require("../controller/User/GetFriends");

//VALIDATOR
const { userRegisterValidate } = require("../validate/userValidator");

const isAuth = require("../middleware/tokenCheck");

//ROUTER
//Get User
router.get("/", isAuth, GetUser);

//REGISTER
router.post("/register", userRegisterValidate, registerController);

//LOGIN
router.post("/login", loginController);

//LOGOUT
router.post("/logout", LogoutController);

//Follow
router.put("/:userId/follow", followController);
//Unfollow
router.put("/:userId/unfollow", unfollowController);

//Get Friends
router.get("/friends/:userId", getFriendsController);
module.exports = router;
