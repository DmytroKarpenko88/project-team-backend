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

router.get('/profile', authenticate, ctrl.getUserInformation);

router.post(
  '/verify',
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

router.patch(
  '/ubdateProfile',
  authenticate,
  validateBody(schemas.ubdateProfileSchema),
  cloudUpload.single('avatarURL'),
  ctrl.updateProfile
);

module.exports = router;
