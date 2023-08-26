const { ctrlWrapper } = require('../../helpers');
const getCurrent = require('./getCurrent');
const resendVerifyEmail = require('./resendVerifyEmail');
const updateAvatar = require('./updateAvatar');
const updateSubscription = require('./updateSubscription');
const updateProfile = require('./ubdateProfile');
const getNoticesByAuthor = require('./getNoticesByAuthor');
const getUserInformation = require('./getUsetInformation');
const deleteNoticesByAuthor = require('./deleteNoticesByAuthor');
const addFavoriteNotice = require('./addFavoriteNotice');

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  updateProfile: ctrlWrapper(updateProfile),
  getNoticesByAuthor: ctrlWrapper(getNoticesByAuthor),
  getUserInformation: ctrlWrapper(getUserInformation),
  deleteNoticesByAuthor: ctrlWrapper(deleteNoticesByAuthor),
  addFavoriteNotice: ctrlWrapper(addFavoriteNotice),
};
