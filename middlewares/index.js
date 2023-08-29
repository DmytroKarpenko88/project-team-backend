const authenticate = require('./authenticate');
const isValidId = require('./isValidId');
const validateBody = require('./validateBody');
const cloudUpload = require('./uploudCloud');

module.exports = {
  validateBody,
  isValidId,
  authenticate,
  cloudUpload,
};
