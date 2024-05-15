const express = require('express');
const router = express.Router();
// const multer = require('multer');
const asyncMiddleware = require('../middlewares/async.middleware');
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

const {
  creatCategoryBig,
  getCategoryBig,
  updateCategoryBig,
  deleteCategoryBig,
} = require('../controllers/categoryBig.controller');

router.route('/').post(asyncMiddleware(creatCategoryBig)).get(asyncMiddleware(getCategoryBig));
router.route('/:id').patch(asyncMiddleware(updateCategoryBig)).delete(asyncMiddleware(deleteCategoryBig));
module.exports = router;
