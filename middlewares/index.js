const authenticate = require('./authenticate');
const isValidId = require('./isValidId');
const upload = require('./upload');
const validateBody = require('./validateBody');
const cloudUpload = require('./uploudCloud');

module.exports = {
  validateBody,
  isValidId,
  authenticate,
  upload,
  cloudUpload,
};
