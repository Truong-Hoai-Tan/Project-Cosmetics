const express = require('express');
const router = express.Router();
const asyncMiddleware = require("../middlewares/async.middleware")

const {
  creatProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getAllProduct,
  getProductHot,
  getProductId,
  getProductnewsdetail,
  getProductsale
} = require('../controllers/product.controller');

router.route('/').get(asyncMiddleware(getAllProduct));
router.route('/product-hot').get(asyncMiddleware(getProductHot))
router.route('/product-news').get(asyncMiddleware(getProductnewsdetail))
router.route('/product-sale').get(asyncMiddleware(getProductsale))
router.route('/:category_id').post(asyncMiddleware(creatProduct)).get(getProduct);
router.route('/:id').patch(asyncMiddleware(updateProduct)).delete(asyncMiddleware(deleteProduct));
router.route('/detail/:id').get(asyncMiddleware(getProductId))

module.exports = router;
