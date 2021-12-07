const router = require("express").Router();

//Controller
const getPostController = require("../controller/Post/getController");
const createPostController = require("../controller/Post/createController");
const updatePostController = require("../controller/Post/updateController");
const deletePostController = require("../controller/Post/deleteController");
const likePostController = require("../controller/Post/likeController");
const timelineController = require("../controller/Post/timelineController");
const ProfilePostController = require("../controller/Post/profileController");
//Router
router.post("/", getPostController);
router.post("/profile", ProfilePostController);
router.post("/:userId/create", createPostController);
router.put("/:postId/update", updatePostController);
router.delete("/:postId/delete", deletePostController);
router.put("/:postId/like", likePostController);
router.post("/timeline", timelineController);

module.exports = router;
