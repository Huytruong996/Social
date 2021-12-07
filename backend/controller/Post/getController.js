const Post = require("../../models/Post");

const getPostController = async (req, res) => {
  try {
    const data = await Post.findById(req.body.postId);

    res.status(200).json(data);
  } catch (e) {
    res.status(403).json(" Post not found");
  }
};

module.exports = getPostController;
