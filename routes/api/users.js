const express = require('express');

const {
  authenticate,
  validateBody,
  cloudUpload,
  isValidId,
} = require('../../middlewares');

const ctrl = require('../../controllers/users');
const { schemas } = require('../../models/user');

const router = express.Router();

router.get('/current', authenticate, ctrl.getCurrent);

router.get('/current/notices', authenticate, ctrl.getNoticesByAuthor);
router.get('/profile', authenticate, ctrl.getUserInformation);

router.patch(
  '/updateProfile',
  authenticate,
  validateBody(schemas.updateProfileSchema),
  cloudUpload.single('avatarURL'),
  ctrl.updateProfile
);

router.delete(
  '/current/notices/:idNotice',
  authenticate,
  isValidId,
  ctrl.deleteNoticesByAuthor
);

router.get('/current/favorites', authenticate, ctrl.getFavoriteNotices);

router.patch(
  '/current/favorites/:idNotice',
  authenticate,
  isValidId,
  ctrl.toggleFavoriteNotice
);

module.exports = router;
