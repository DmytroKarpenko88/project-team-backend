const { ctrlWrapper } = require('../../helpers');
const { Notice } = require('../../models/notice');

const searchNotices = async (req, res) => {

  const result = await Notice.find().populate(
    '_category _owner',
    '-createdAt -updatedAt -token -password -favorites'
  );

  res.json(result);
};

module.exports = ctrlWrapper(searchNotices);
