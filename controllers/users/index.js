const { ctrlWrapper } = require('../../helpers');

const getCurrent = require('./getCurrent');
const updateProfile = require('./updateProfile');
const getNoticesByAuthor = require('./getNoticesByAuthor');
const getUserInformation = require('./getUsetInformation');
const deleteNoticesByAuthor = require('./deleteNoticesByAuthor');
const toggleFavoriteNotice = require('./toggleFavoriteNotice');
const getFavoriteNotices = require('./getFavoriteNotices');

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  updateProfile: ctrlWrapper(updateProfile),
  getNoticesByAuthor: ctrlWrapper(getNoticesByAuthor),
  getUserInformation: ctrlWrapper(getUserInformation),
  deleteNoticesByAuthor: ctrlWrapper(deleteNoticesByAuthor),
  toggleFavoriteNotice: ctrlWrapper(toggleFavoriteNotice),
  getFavoriteNotices: ctrlWrapper(getFavoriteNotices),
};
