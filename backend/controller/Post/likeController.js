const Post = require("../../models/Post");
const User = require("../../models/User");

const likePostController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const user = await User.findById(req.body.userId);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json(" Post has been liked ");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json(" Post hasn't been liked ");
    }
  } catch (e) {
    res.status(403).json(" Post or user not found");
  }
};

module.exports = likePostController;
