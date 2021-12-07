const { generateToken } = require("../../helpers/jwt.helper");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

//Model
const User = require("../../models/User");

let tokenList = [];

//DOT-ENV
const dotEnv = require("dotenv");

dotEnv.config();

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const loginController = async (req, res) => {
  try {
    const error = validationResult(req).errors;
    if (error.length > 0)
      return res.status(403).json(validationResult(req).errors[0].msg);

    const result = await User.findOne({ email: req.body.email });
    if (!result) return res.status(403).json("Email or Password is incorrect ");

    const validPassword = await bcrypt.compare(
      req.body.password,
      result.password
    );

    if (!validPassword)
      return res.status(403).json("Email or Password is incorrect ");

    const {
      _id,
      name,
      email,
      password,
      followers,
      followings,
      isAdmin,
      coverPicture,
      profilePicture,
    } = result;
    const payLoad = {
      _id,
      name,
      email,
      password,
    };

    const dataRes = {
      _id,
      name,
      email,
      password,
      followers,
      followings,
      isAdmin,
      coverPicture,
      profilePicture,
    };

    const accessToken = await generateToken(
      payLoad,
      accessTokenSecret,
      accessTokenLife
    );
    const refreshToken = await generateToken(
      payLoad,
      refreshTokenSecret,
      refreshTokenLife
    );

    /* DEBUG */
    // accessToken.reject((e) => console.log("Access: ", e));
    // refreshToken.then( e => console.log("Refresh " , e))

    tokenList[refreshToken] = { accessToken, refreshToken };
    //SET Cookie
    res.cookie("token", tokenList[refreshToken], {
      httpOnly: true,
    });
    return res.status(200).json({
      ...dataRes,
      accessToken: accessToken,
      refreshToken: refreshToken,
      message: "Logged Successfully",
    });
  } catch (e) {
    return res.status(403).json({ e });
  }
};

module.exports = {
  loginController,
  tokenList,
};
