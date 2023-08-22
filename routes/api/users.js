const express = require('express');

const {
  authenticate,
  validateBody,
  upload,
  cloudUpload,
} = require('../../middlewares');

const ctrl = require('../../controllers/users');
const { schemas } = require('../../models/user');

const router = express.Router();

router.get('/current', authenticate, ctrl.getCurrent);

router.post(
  '/verify',
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

router.patch(
  '/subscription',
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrl.updateAvatar
);

router.patch(
  '/ubdateProfile',
  authenticate,
  validateBody(schemas.ubdateProfileSchema),
  cloudUpload.single('avatarURL'),
  ctrl.updateProfile
);

module.exports = router;
