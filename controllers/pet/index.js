const addPet = require('./addPet');
const { ctrlWrapper } = require('../../helpers');

module.exports = {
  addPet: ctrlWrapper(addPet),
};
