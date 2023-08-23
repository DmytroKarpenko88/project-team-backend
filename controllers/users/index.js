const { ctrlWrapper } = require('../../helpers');
const getCurrent = require('./getCurrent');
const resendVerifyEmail = require('./resendVerifyEmail');
const updateAvatar = require('./updateAvatar');
const updateSubscription = require('./updateSubscription');
const getNoticesByAuthor = require('./getNoticesByAuthor');

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  getNoticesByAuthor: ctrlWrapper(getNoticesByAuthor),
};
