const { ctrlWrapper, HttpError } = require('../../helpers');
const { Notice } = require('../../models/notice');

const dataCategories = {
  sell: 'Sell',
  'in-good-hands': 'In good hands',
  'lost-found': 'Lost/Found',
};

const postNotice = async (req, res) => {
  const { _id } = req.user;
  const body = req.body;

  if (!body) {
    throw HttpError(400, 'Bad request');
  }

  body.category = {
    title: dataCategories[body.category],
    code: body.category,
  };

  const data = req.file
    ? { ...body, petURL: req.file.path, _owner: _id }
    : { ...body, _owner: _id };

  const {_id: idNewNotice} = await Notice.create(data);

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
      _id: idNewNotice,
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
