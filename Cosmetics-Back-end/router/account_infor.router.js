const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middlewares/async.middleware');
const authmiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

const {
  creatInfor, 
  getAccountInfor,
  deleteAccountInfor,
  updateAccountInfor,
} = require('../controllers/account_infor.controller');

router.route('/').get(asyncMiddleware(getAccountInfor));
router.route('/').post(
  asyncMiddleware(authmiddleware),
  asyncMiddleware(creatInfor))
.get(asyncMiddleware(getAccountInfor));
router.route('/:id').patch(asyncMiddleware(updateAccountInfor)).delete(asyncMiddleware(deleteAccountInfor));
module.exports = router;