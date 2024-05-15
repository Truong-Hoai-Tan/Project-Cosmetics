const oderModel = require('../model/oder.model');
const cart = require('../model/cart.model');
const cartModel = require('../model/cart.model');
const { requestPaymentZaloPayload } = require('../helpers/ZaloPay.helper');
const zalopayModel = require('../model/zalopay.model');

module.exports = {
  getOder: async (req, res) => {
    const account_id = req.query.account_id;
    const status = req.query.status;
    const bodyQuery = {};
    if (account_id) {
      bodyQuery.account = account_id;
    }
    if (status) {
      bodyQuery.status = status;
    }
    const orders = await oderModel.find(bodyQuery).populate({
      path: 'cart',
      populate: {
        path: 'items.product',
      },
    });
    return res.status(200).json(orders);
  },
  getOderId: async (req, res) => {
    const id = req.params.id;
    const accountId = await oderModel.findById(id).populate({
      path: 'cart',
      populate: {
        path: 'items.product',
      },
    });
    return res.status(200).json(accountId);
  },
  creatOder: async (req, res) => {
    const body = req.body;
    const cart_id = body.cart;
    
    body.createdAt  = Date.now();
    const [_, oder] = await Promise.all([
      cartModel.findByIdAndUpdate(cart_id, { isOrder: 1 }),
      oderModel.create(body),
    ]);

    if (body?.payment === 'zalopay') {
      const url = await requestPaymentZaloPayload({
        amount: body.totalPrice,
        appUser: oder._id,
        order_id: oder._id,
        description: `Thanh toán đơn hàng ${oder._id}`,
        title: `Thanh toán đơn hàng ${oder._id}`,
      });

      return res.status(201).json(url);
    }

    return res.status(201).json(oder);
  },
  updateOder: async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const updateOder = await oderModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(200).json(updateOder);
  },
  deleteOder: async (req, res) => {
    const oder_id = req.params.id;
    console.log(oder_id);
    const deleteOder = await oderModel.findByIdAndDelete(oder_id);
    return res.status(200).json(deleteOder);
  },

  getResponseZaloPay: async (req, res) => {
    const app_trans_id = req.query.apptransid;

    const orders = await zalopayModel
      .findOne({ app_trans_id: app_trans_id })
      .populate({
        path: 'order',
        populate: {
          path: 'cart',
          populate: {
            path: 'items.product',
          },
        },
      });

    return res.status(200).json(orders);
  },
};
