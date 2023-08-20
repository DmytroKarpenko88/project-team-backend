const { ctrlWrapper } = require("../../helpers");
const { Notice } = require("../../models/notice");

const getAllNotices = async (req, res) => {
  const result = await Notice.find().populate('_category');
  res.json(result);
};

module.exports = ctrlWrapper(getAllNotices);