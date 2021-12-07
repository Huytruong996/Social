const { getPagination } = require("../../helpers/getPagination");
const Post = require("../../models/Post");
const User = require("../../models/User");

const timelineController = async (req, res) => {
  try {
    const { page, size, id } = req.query;
    const { limit, offset } = getPagination(page, size);
    const userId = id || req.body.userId;
    const timeline = [];
    const currentUser = await User.findById(userId);

    const userPost = await Post.paginate({ userId: userId }, { limit, offset });
    if (currentUser) {
      const { name, email, profilePicture } = currentUser;

      userPost.docs.map((post) => {
        timeline.push(post._id);
      });
      // console.log(page);
      await Promise.all(
        currentUser.followings.map(async (friend_Id) => {
          const currentFriend = await User.findById(friend_Id);
          const friendPost = await Post.paginate(
            { userId: friend_Id },
            { limit, offset }
          );

          const { name, email, profilePicture } = currentFriend;
          friendPost.docs.map((post) => {
            timeline.push(post._id);
          });
        })
      );
    }
    // console.log(timeline);
    res.status(200).json(timeline);
  } catch (e) {
    console.log(e);
    return res.status(403).json(" User not founded ");
  }
};

module.exports = timelineController;
