const ErrorReponse = require('../helpers/ErrorReponse');
const accountModel = require('../model/account.model');
const accountValid = require('../validations/account.valid');

module.exports = {
  creatAccount: async (req, res, next) => {
    const body = req.body;
    const { error, value } = accountValid(body);
    if (error) {
      // return res.status(400).json({
      //   statusCode: 400,
      //   message: error.message,
      // });
      throw new ErrorReponse(400, error.message);
    }
    const newAccount = await accountModel.create(body);
    return res.status(201).json(newAccount);
  },
  getAccountId: async (req, res) => {
    const id = req.params.id;
    const accountId = await accountModel.findById(id)
    return res.status(200).json(accountId);
  },
  getAccount: async (req, res, next) => {
    const Acounts = await accountModel.find();
    return res.status(200).json(Acounts);
  },
  updateAccout: async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    const updateAcc = await accountModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(200).json(updateAcc);
  },
  deleteAccount: async (req, res, next) => {
    const id = req.params.id;
    const deleteAcc = await accountModel.findByIdAndDelete(id);
    return res.status(200).json(deleteAcc);
  },
  getProfile: async (req, res) => {
    return res.status(200).json(req.account);
  }
};
