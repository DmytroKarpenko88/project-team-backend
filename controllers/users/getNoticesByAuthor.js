const { ctrlWrapper } = require("../../helpers");
const { Notice } = require("../../models/notice");

const getNoticesByAuthor = async (req, res) => {
  const {_id: _owner} = req.user
  const result = await Notice.find({_owner});
  res.json(result);
}

module.exports = ctrlWrapper(getNoticesByAuthor);