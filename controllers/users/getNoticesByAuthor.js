const { ctrlWrapper } = require("../../helpers");
const { Notice } = require("../../models/notice");

const getNoticesByAuthor = async (req, res) => {
  const result = await Notice.find();
  console.log('req.user: ', req.user);
  res.json(result);
}

module.exports = ctrlWrapper(getNoticesByAuthor);