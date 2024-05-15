const jobModel = require('../model/job.model');
// const productValid = require('../validations/product.valid');
module.exports = {
  creatJob: async (req, res, next) => {
    const account_id = req.params.account_id;
    const body = req.body;
    // const { error, value } = productValid(body);
    // if (error) {
    //   return res.status(400).json({
    //     statusCode: 400,
    //     message: error.message,
    //   });
    // }
    body.account = account_id;
    const newJob = await jobModel.create(body);
    return res.status(201).json(newJob);
  },
  getJob: async (req, res, next) => {
    const account_id = req.params.account_id;
    const account = await jobModel.find({
      account: account_id, 
    });
    return res.status(200).json(account);
  },
  getAllJobs: async(req, res) => {
    const accounts = await jobModel.find();
    return res.status(200).json(accounts);
  },
  updateJob: async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    const updateJob = await jobModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(200).json(updateJob);
  },
  deleteJob: async (req, res, next) => {
    const id = req.params.id;
    const deleteJob = await jobModel.findByIdAndDelete(id);
    return res.status(200).json(deleteJob);
  },
};
