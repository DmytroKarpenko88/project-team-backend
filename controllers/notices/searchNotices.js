const { ctrlWrapper, HttpError } = require('../../helpers');
const { Notice } = require('../../models/notice');

const categoriesListCode = [
  'sell',
  'in-good-hands',
  'lost-found',
];

const searchNotices = async (req, res) => {
  const { category = 'sell' } = req.params;

  if (!categoriesListCode.includes(category)) {
    throw HttpError(400, 'Bad request');
  }

  const { search = '' } = req.query;

  const result = await Notice.find({
    'category.code': category,
    title: new RegExp(search, 'i'),
  })
  .populate('_owner', '-createdAt -updatedAt -token -password -favorites')
  .sort({createdAt: -1});

  res.json(result);
};

module.exports = ctrlWrapper(searchNotices);
