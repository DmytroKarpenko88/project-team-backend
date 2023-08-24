const { ctrlWrapper } = require('../../helpers');
const { Notice } = require('../../models/notice');

const getAllNotices = async (req, res) => {
  const { _id: _owner } = req.user;
  const result = await Notice.find({ _owner }).populate(
    '_category _owner',
    '-createdAt -updatedAt -token -password'
  );
  res.json(result);
};

module.exports = ctrlWrapper(getAllNotices);
