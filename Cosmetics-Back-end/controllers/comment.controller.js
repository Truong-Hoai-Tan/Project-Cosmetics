const commentModel = require('../model/comment.model');
const productModel = require('../model/product.model');
const accountModel = require('../model/account.model');
const ErrorResponse = require('../helpers/ErrorReponse');
const commentValid = require('../validations/comment.valid');
module.exports = {
  creatComment: async (req, res, next) => {
    const product_id = req.params.product_id;
    const account_id = req.body.account;

    const body = req.body;
    body.createdAt = Date.now();
    const { error, value } = commentValid(body);
    if (error) {
      throw new ErrorResponse(400, error.message);
    }
    //check account
    const account_comment = await accountModel.findById(account_id);
    if (!account_comment) {
      throw new ErrorResponse(404, 'id tài khoản không tồn tại');
    }

    //check product
    const product_comment = await productModel.findById(product_id);
    if (!product_comment) {
      throw new ErrorResponse(404, 'product_id not found');
    }

    body.product = product_id;

    const newComment = await commentModel.create(body);
    return res.status(201).json(newComment);
  },
  getComment: async (req, res, next) => {
    const product_id = req.params.product_id;
    const comments = await commentModel
      .find({
        product: product_id,
      })
      .populate('account');
    return res.status(200).json(comments);
  },
  getAllComment: async (req, res) => {
    const product = await commentModel.find();

    return res.status(200).json(product);
  },
  updateComment: async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    const updateCm = await commentModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(200).json(updateCm);
  },
  deleteComment: async (req, res, next) => {
    const id = req.params.id;
    const deleteCm = await commentModel.findByIdAndDelete(id);
    return res.status(200).json(deleteCm);
  },
};
