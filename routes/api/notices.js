const express = require('express');
const router = express.Router();

const { authenticate, validateBody } = require('../../middlewares');

const {
  searchNotices,
  postNotice,
  getOneNotice
} = require('../../controllers/notices');

const { schemas } = require('../../models/notice');

router.get('/filter/:category', searchNotices);

router.post(
  '/',
  authenticate,
  validateBody(schemas.addNoticeSchema),
  postNotice
);

router.get('/:idNotice', getOneNotice);

module.exports = router;
