const User = require("../../models/User");

const followController = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const userFollower = await User.findById(req.body.userId);

    if (req.params.userId === req.body.userId)
      return res.status(403).json("Cant not follow yourself");
    if (user.followers.includes(req.body.userId))
      return res.status(403).json("This user is following you ");
    await user.updateOne({ $push: { followers: req.body.userId } });
    await userFollower.updateOne({ $push: { followings: req.params.userId } });
    res.status(200).json("Follow Successfully");
  } catch (e) {
    res.status(403).send("User not founded");
  }
};

module.exports = { followController };
