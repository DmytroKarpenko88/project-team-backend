const { HttpError } = require('../../helpers');
const { Pet } = require('../../models/pet');

const addPet = async (req, res) => {
  const { _id } = req.user;
  const body = req.body;

  if (!body) {
    throw HttpError(400, 'Bad request');
  }

  const data = req.file
    ? { ...body, petURL: req.file.path, _owner: _id }
    : { ...body, _owner: _id };

  const result = await Pet.create(data);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  const { name, birthday, type, petURL, describe } = result;

  res.status(201).json({
    code: 201,
    data: {
      name,
      birthday,
      type,
      petURL,
      describe,
      _id: result._id,
      _owner: result._owner,
    },
  });
};

module.exports = addPet;
