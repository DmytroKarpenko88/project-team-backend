const { ctrlWrapper } = require('../../helpers');
const addPet = require('./addPet');
const deletePet = require('./deletePet');
const getAllPets = require('./getAllPets');

module.exports = {
  addPet: ctrlWrapper(addPet),
  deletePet: ctrlWrapper(deletePet),
  getAllPets: ctrlWrapper(getAllPets),
};
