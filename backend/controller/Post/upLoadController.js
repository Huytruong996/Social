const Post = require("../../models/Post");

const upLoadController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    await post.updateOne({ $set: { img: req.body.name } });
    return res.status(200).json("File uploded successfully");
  } catch (e) {
    console.log(e);
  }
};

module.exports = upLoadController;
