const express = require('express');
const router = express.Router();
const multer = require('multer');
const asyncMiddleware = require('../middlewares/async.middleware');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const {
  creatCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category.controller');

router.route('/').post(upload.single('img'), asyncMiddleware(creatCategory)).get(asyncMiddleware(getCategory));
router.route('/:id').patch(asyncMiddleware(updateCategory)).delete(asyncMiddleware(deleteCategory));
module.exports = router;
