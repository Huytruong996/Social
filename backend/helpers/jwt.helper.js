const jwt = require("jsonwebtoken");

/**
 * private function generateToken
 * @param payLoad
 * @param secretSignature
 * @param tokenLife
 */
const generateToken = (payLoad, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { data: payLoad },
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
      (e, token) => {
        if (e) return reject(e);
        resolve(token);
      }
    );
  });
};

/**
 * This module used for verify jwt token
 * @param {*} token
 * @param {*} secretKey
 */
const verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (e, decoded) => {
      if (e) return reject(e);
      resolve(decoded);
    });
  });
};

module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken,
};
