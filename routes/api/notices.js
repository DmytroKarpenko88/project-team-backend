const express = require('express');
const router = express.Router();

const {
  authenticate,
  validateBody,
  cloudUpload,
  isValidId,
} = require('../../middlewares');

const {
  searchNotices,
  postNotice,
  getOneNotice,
} = require('../../controllers/notices');

const { schemas } = require('../../models/notice');

router.get('/filter/:category', searchNotices);

router.post(
  '/',
  authenticate,
  cloudUpload.single('petURL'),
  validateBody(schemas.addNoticeSchema),
  postNotice
);

router.get('/:idNotice', isValidId, getOneNotice);

module.exports = router;
