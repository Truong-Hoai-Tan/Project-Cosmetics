const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middlewares/async.middleware');

const {
  getOder,
  creatOder,
  deleteOder,
  updateOder,
  getOderId,
  getResponseZaloPay,
} = require('../controllers/oder.controller');

router.get('/zaloPay', asyncMiddleware(getResponseZaloPay));

router
  .route('/')
  .get(asyncMiddleware(getOder))
  .post(asyncMiddleware(creatOder));
router
  .route('/:id')
  .delete(asyncMiddleware(deleteOder))
  .patch(asyncMiddleware(updateOder));
router.route('/detailOder/:id').get(asyncMiddleware(getOderId));
module.exports = router;
