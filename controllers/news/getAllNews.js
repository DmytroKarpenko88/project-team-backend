const { HttpError } = require('../../helpers');
const { New } = require('../../models/new');

const getAllNews = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await New.find({}, '', { skip, limit });

  if (!result) {
    throw HttpError(400, 'Not found news');
  }

  const totalCount = await New.countDocuments({});
  console.log('totalCount:', totalCount);

  res.status(200).json({
    code: 200,
    data: {
      news: [...result],
      totalCount,
    },
  });
};

module.exports = getAllNews;
