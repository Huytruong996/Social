const Post = require("../../models/Post");
const User = require("../../models/User");

const createPostController = async (req, res) => {
  try {
    await User.findById(req.params.userId);
    if (!(req.params.userId === req.body.userId))
      return res.status(403).send(" Invalid User Id");
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (e) {
    res.status(403).json(" User not found");
  }
};

module.exports = createPostController;
