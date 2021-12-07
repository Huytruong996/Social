const User = require("../../models/User");

const unfollowController = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const userFollower = await User.findById(req.body.userId);

    if (req.params.userId === req.body.userId)
      return res.status(403).json("Cant not unfollow yourself");
    if (!user.followers.includes(req.body.userId))
      return res.status(403).json("This user is not following you ");
    await user.updateOne({ $pull: { followers: req.body.userId } });
    await userFollower.updateOne({ $pull: { followings: req.params.userId } });
    res.status(200).json("Unfollow Successfully");
  } catch (e) {
    res.status(403).send("User not founded");
  }
};

module.exports = { unfollowController };
