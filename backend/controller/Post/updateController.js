const Post = require("../../models/Post");

const updatePostController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!req.body.userId || !(post.userId === req.body.userId))
      return res.status(403).send(" Invalid User Id");

    await post.updateOne({ $set: req.body });
    res.status(200).json("Update Successfully");
  } catch (e) {
    res.status(403).json(" Post not found");
  }
};

module.exports = updatePostController;
