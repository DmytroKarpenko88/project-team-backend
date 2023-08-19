const { ctrlWrapper } = require("../../helpers");
const { Notice } = require("../../models/notice");

const postNotice = async (req, res) => {
  const result = await Notice.create({ ...req.body });
  res.status(201).json(result);
};

module.exports = ctrlWrapper(postNotice);