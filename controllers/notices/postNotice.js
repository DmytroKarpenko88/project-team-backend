const { ctrlWrapper } = require('../../helpers');
const { Notice } = require('../../models/notice');

const postNotice = async (req, res) => {
  const { _id } = req.user;
  const result = await Notice.create({ ...req.body, _owner: _id });
  res.status(201).json(result);
};

module.exports = ctrlWrapper(postNotice);
