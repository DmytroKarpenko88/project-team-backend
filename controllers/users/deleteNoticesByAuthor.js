const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/notice");

const deleteNoticesByAuthor = async (req, res) => {
  const {_id: _owner} = req.user;
  const {idNotice} = req.params;
  const {_owner: ownerOfNotice} = await Notice.findById(idNotice, '_owner');
  
  if (_owner.toString() !== ownerOfNotice.toString()) {
    throw HttpError(403, 'Forbidden');
  }

  const result = await Notice.findByIdAndDelete(idNotice);
  res.json(result);
};

module.exports = deleteNoticesByAuthor;