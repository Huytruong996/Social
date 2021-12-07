const User = require("../../models/User");
const getFriendsController = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );

    let friendList = [];

    friends.map((friend) => {
      const { _id, email, profilePicture, coverPicture, name } = friend;
      friendList.push({ _id, email, profilePicture, coverPicture, name });
    });
    res.status(200).json(friendList);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.getFriendsController = getFriendsController;
