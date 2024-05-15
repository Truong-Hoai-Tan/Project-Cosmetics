const express = require('express');
const router = express.Router();

const asyncMiddleware = require("../middlewares/async.middleware")
const {
  creatJob,
  getJob,
  deleteJob,
  updateJob,
  getAllJobs
} = require('../controllers/job.controller');

router.route('/').get(asyncMiddleware(getAllJobs));
router.route('/:account_id').post(asyncMiddleware(creatJob)).get(asyncMiddleware(getJob));
router.route('/:id').patch(asyncMiddleware(updateJob)).delete(asyncMiddleware(deleteJob));
module.exports = router;
