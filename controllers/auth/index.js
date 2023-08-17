const { ctrlWrapper } = require('../../helpers');
const login = require('./login');
const logout = require('./logout');
const register = require('./register');
const verifyEmail = require('./verifyEmail');

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  verifyEmail: ctrlWrapper(verifyEmail),
};
