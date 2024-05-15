require('dotenv').config();
const ErrorReponse = require('../helpers/ErrorReponse');
const accountModel = require('../model/account.model');
const accountValid = require('../validations/account.valid');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  register: async (req, res, next) => {
    const body = req.body;
    const { error, value } = accountValid(body);
    if (error) {
      // return res.status(400).json({
      //   statusCode: 400,
      //   message: error.message,
      // });
      throw new ErrorReponse(404, error.message);
    }
    const newAccount = await accountModel.create(body);
    return res.status(201).json({
      statusCode: 201,
      message: 'Đăng Ký Thành Công',
      Data: newAccount,
    });
  },
  login: async (req, res, next) => {
    const { username, password } = req.body;
    const account = await accountModel.findOne({ username });

    console.log(account);
    if (!account) {
      // return res.status(400).json({
      //   statusCode: 400,
      //   message: 'Sai Tài Khoản & Mật Khẩu ',
      // });
      throw new ErrorReponse(404, 'Sai Tài Khoản hoặc Mật Khẩu');
    }
    const checkPass = bcryptjs.compareSync(password, account.password);

    if (!checkPass) {
      // return req.status(400).json({
      //   statusCode: 400,
      //   message: 'Sai Tài Khoản & Mật Khẩu ',
      // });
      throw new ErrorReponse(404, 'Sai Tài Khoản hoặc Mật Khẩu');
    }
    const payload = {
      _id: account._id,
      username: account.username,
      role: account.role,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    // account.role = 'admin';

    // await account.save();

    return res.status(201).json({
      ...payload,
      jwt: token,
    });
  },
};
