const { Notice } = require("../../models/notice");

const getNoticesByAuthor = async (req, res) => {
  const {_id: _owner} = req.user
  const result = await Notice.find({_owner}).populate('_owner _category', '-createdAt -updatedAt -password -token');
  res.json(result);
}

module.exports = getNoticesByAuthor;