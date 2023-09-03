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

  const dataNotice = await Notice.create(data);

  console.log('dataNotice: ', dataNotice);

  const dataResponse = {
    _id: dataNotice._id,
    title: dataNotice.title,
    name: dataNotice.name,
    sex: dataNotice.sex,
    category: dataNotice.category,
    petURL: dataNotice.petURL,
    location: dataNotice.location,
    price: dataNotice.price,
    birthday: dataNotice.birthday,
    type: dataNotice.type,
    describe: dataNotice.describe,
  };

  res.status(201).json({
    code: 201,
    data: dataResponse,
  });
};

module.exports = ctrlWrapper(postNotice);
