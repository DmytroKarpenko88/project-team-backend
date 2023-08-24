const express = require('express');
const router = express.Router();

const { authenticate, validateBody } = require('../../middlewares');

const { getAllNotices, postNotice } = require('../../controllers/notices');

const { schemas } = require('../../models/notice');

router.get('/', authenticate, getAllNotices);

router.post(
  '/',
  authenticate,
  validateBody(schemas.addNoticeSchema),
  postNotice
);

module.exports = router;
