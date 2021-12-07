const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

//Model
const User = require("../../models/User");

const registerController = async (req, res) => {
  try {
    const error = validationResult(req).errors;
    if (error.length > 0)
      return res.status(400).send(validationResult(req).errors[0].msg);

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await new User({
      ...req.body,
      password: hashPassword,
    });

    const userSaved = await newUser.save();
    res.send(userSaved);
  } catch (e) {
    res.status(400, `error${e}`);
  }
};

module.exports = { registerController };
