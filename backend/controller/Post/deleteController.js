const Post = require("../../models/Post");

const deletePostController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!req.body.userId || !(post.userId === req.body.userId))
      return res.status(403).send(" Invalid User Id");

    await post.deleteOne();
    res.status(200).json("Delete Successfully");
  } catch (e) {
    res.status(403).json(" Post not found");
  }
};

module.exports = deletePostController;
