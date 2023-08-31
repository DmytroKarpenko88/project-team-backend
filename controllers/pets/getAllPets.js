const { HttpError } = require('../../helpers');
const { Pet } = require('../../models/pet');

const getAllPets = async (req, res) => {
  const { user } = req;

  if (!user) {
    throw HttpError(401, 'Not authorized');
  }

  const pets = await Pet.find({ _owner: user._id });

  res.status(200).json({
    code: 200,
    data: {
      pets,
    },
  });
};

module.exports = getAllPets;
