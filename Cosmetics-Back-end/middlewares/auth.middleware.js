require('dotenv').config();
const jwt = require('jsonwebtoken');

const accountModel = require('../model/account.model');
const ErrorReponse = require('../helpers/ErrorReponse');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!accountModel || !authorization.startsWith('Bearer ')) {
    throw new ErrorReponse(401, 'Token Không Đúng');
  }
  const token = authorization.split(' ')[1];

  const decode = jwt.verify(token, process.env.SECRET_KEY);

  const account = await accountModel.findById(decode._id);
  if (!account) {
    throw new ErrorReponse(401, 'Tài Khoản Không Tồn Tại');
  }
  req.account = account;
  next();
};
