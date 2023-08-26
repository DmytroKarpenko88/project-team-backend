const { HttpError } = require('../../helpers');
const { Pet } = require('../../models/pet');

const deletePet = async (req, res) => {
  const { _id: id } = req.user;
  const { petId } = req.params;
  console.log(id);

  const pets = await Pet.find({ _owner: id });

  const result = res.status(200).json({
    code: 200,
    pets,
  });
};

module.exports = deletePet;
