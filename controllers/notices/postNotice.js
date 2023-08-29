const { ctrlWrapper, HttpError } = require('../../helpers');
const { Notice } = require('../../models/notice');

const postNotice = async (req, res) => {
  const { _id } = req.user;
  const body = req.body;
  console.log('body:', body);

  if (!body) {
    throw HttpError(400, 'Bad request');
  }

  const data = req.file
    ? { ...body, petURL: req.file.path, _owner: _id }
    : { ...body, _owner: _id };
  console.log('data:', data);

  await Notice.create(data);

  const {
    name,
    title,
    sex,
    category,
    petURL,
    location,
    price,
    birthday,
    type,
    describe,
  } = data;

  res.status(201).json({
    code: 201,
    data: {
      name,
      title,
      sex,
      category,
      petURL,
      location,
      price,
      birthday,
      type,
      describe,
    },
  });
};

module.exports = ctrlWrapper(postNotice);
