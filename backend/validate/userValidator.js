const { check } = require("express-validator");

const userRegisterValidate = [
  check("name")
    .exists()
    .withMessage("Vui lòng nhập tên")
    .isString()
    .withMessage("Tên sai định dạng")
    .isLength({ min: 6 })
    .withMessage("Tên phải có ít nhất 6 ký tự")
    .isLength({ max: 255 })
    .withMessage("Tên tối đa có 255 ký tự"),
  check("email")
    .exists()
    .withMessage("Vui lòng nhập email")
    .isEmail()
    .withMessage("Email sai định dạng")
    .isLength({ min: 6 })
    .withMessage("Email phải có ít nhất 6 ký tự")
    .isLength({ max: 255 })
    .withMessage("Email tối đa có 255 ký tự"),
  check("password")
    .exists()
    .withMessage("Vui lòng nhập password")
    .isLength({ min: 6 })
    .withMessage("Password phải có ít nhất 6 ký tự")
    .isLength({ max: 1024 })
    .withMessage("Password tối đa có 1024 ký tự"),
];

const userLoginValidate = [
  check("name").not().exists().withMessage("Không được truyền tên"),
  check("email")
    .exists()
    .withMessage("Vui lòng nhập email")
    .isEmail()
    .withMessage("Email sai định dạng"),
  check("password").exists().withMessage("Vui lòng nhập password"),
];

module.exports = { userRegisterValidate, userLoginValidate };
