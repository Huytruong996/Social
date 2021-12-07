const User = require("../../models/User");

const GetUser = async (req, res) => {
  const userId = req.query.userId;
  try {
    const user = await User.findById(userId);
    const { password, updatedAt, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (e) {
    res.status(403).send(e);
  }
};

module.exports = { GetUser };
