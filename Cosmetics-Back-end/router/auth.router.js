const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/async.middleware')

const { register, login } = require('../controllers/auth.controller');
router.route('/login').post(middleware(login));
router.route('/register').post(middleware(register));
 
module.exports = router;
