const express = require('express');

const {
  authenticate,
  validateBody,
  cloudUpload,
} = require('../../middlewares');

const ctrl = require('../../controllers/users');
const { schemas } = require('../../models/user');

const router = express.Router();

router.get('/current', authenticate, ctrl.getCurrent);

router.get('/current/notices', authenticate, ctrl.getNoticesByAuthor);
router.get('/profile', authenticate, ctrl.getUserInformation);

router.post(
  '/verify',
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

router.patch(
  '/updateProfile',
  authenticate,
  validateBody(schemas.ubdateProfileSchema),
  cloudUpload.single('avatarURL'),
  ctrl.updateProfile
);

router.delete(
  '/current/notices/:idNotice',
  authenticate,
  ctrl.deleteNoticesByAuthor
);

// router.patch(
router.get('/current/favorits/:idNotice', authenticate, ctrl.addFavoriteNotice);

module.exports = router;
