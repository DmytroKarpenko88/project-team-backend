const { ctrlWrapper } = require('../../helpers');
const login = require('./login');
const logout = require('./logout');
const register = require('./register');

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
};
