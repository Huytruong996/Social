const LogoutController = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json("Logged out successfully !");
};

module.exports = { LogoutController };
