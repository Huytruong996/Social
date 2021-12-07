const { verifyToken, generateToken } = require("../../helpers/jwt.helper");
const { tokenList } = require("../User/Login");

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const refreshTokenController = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken && tokenList[refreshToken]) {
    try {
      const decode = await verifyToken(refreshToken, refreshTokenSecret);

      const payLoad = decode.data;

      const accessToken = await generateToken(
        payLoad,
        accessTokenSecret,
        accessTokenLife
      );
      tokenList[refreshToken] = { accessToken, refreshToken };
      return res.status(200).send({
        accessToken: accessToken,
        refreshToken: refreshToken,
        message: "Refresh Token Successfully",
      });
    } catch (e) {
      res.status(400, `error${e}`);
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).send({
      message: "No refreshToken provided. ",
    });
  }
};

module.exports = refreshTokenController;
