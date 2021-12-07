const { verifyToken } = require("../helpers/jwt.helper");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

/**
 * Middleware: Authorization user by Token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const isAuth = async (req, res, next) => {
  const tokenClient =
    req.headers["authorization"] ||
    req.body.token ||
    req.query.token ||
    req.cookies.token.accessToken;
  console.log(tokenClient);
  if (!tokenClient)
    return res.status(403).send({ message: "No Access-Token Provided" });

  try {
    const decode = await verifyToken(tokenClient, accessTokenSecret);

    req.jwtDecoded = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

module.exports = isAuth;
