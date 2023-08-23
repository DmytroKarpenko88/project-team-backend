const { ctrlWrapper } = require('../../helpers');
const getCurrent = require('./getCurrent');
const resendVerifyEmail = require('./resendVerifyEmail');
const updateAvatar = require('./updateAvatar');
const updateSubscription = require('./updateSubscription');
const updateProfile = require('./ubdateProfile');
const getUserInformation = require('./getUsetInformation');

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  updateProfile: ctrlWrapper(updateProfile),
  getUserInformation: ctrlWrapper(getUserInformation),
};
