const Post = require("../../models/Post");
const User = require("../../models/User");

const ProfilePostController = async (req, res) => {
  try {
    const timeline = [];
    const currnentUser = await User.findById(req.body.userId);
    const userPost = await Post.find({ userId: req.body.userId });
    const { name, email, profilePicture } = currnentUser;

    userPost.map((post) => {
      timeline.push({
        detailPost: post,
        author: { name, email, profilePicture },
      });
    });

    res.status(200).json(timeline);
  } catch (e) {
    return res.status(403).json(" User not founded ");
  }
};

module.exports = ProfilePostController;
