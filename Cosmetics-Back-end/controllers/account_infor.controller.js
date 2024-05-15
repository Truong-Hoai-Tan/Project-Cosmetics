const account_inforModel = require('../model/account_infor.model');
// const productValid = require('../validations/product.valid');
module.exports = {
  creatInfor: async (req, res, next) => {
    const account_infor = req.account;
    const body = req.body;
    // const { error, value } = productValid(body);
    // if (error) {
    //   return res.status(400).json({
    //     statusCode: 400,
    //     message: error.message,
    //   });
    // }
    body.account = account_infor;
    const new_infor = await account_inforModel.create(body);
    return res.status(201).json(new_infor);
  },
  getAccountInfor: async (req, res, next) => {
    const account_id = req.account;
    const account_infor = await account_inforModel.find({
      account: account_id, 
    });
    return res.status(200).json(account_infor);
  },
//   getAllJobs: async(req, res) => {
//     const accounts = await jobModel.find();
//     return res.status(200).json(accounts);
//   },
  updateAccountInfor: async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    const updateInfor = await account_inforModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(200).json(updateInfor);
  },
  deleteAccountInfor: async (req, res, next) => {
    const id = req.params.id;
    const deleteInfor = await account_inforModel.findByIdAndDelete(id);
    return res.status(200).json(deleteInfor);
  },
};