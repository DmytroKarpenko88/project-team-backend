const { ctrlWrapper } = require("../../helpers");
const { Notice } = require("../../models/notice");

const getOneNotice = async (req, res) => {
  const {idNotice} = req.params;
  console.log("idNotice: ", idNotice);
  const result = await Notice.findById(idNotice).populate(
    '_category _owner',
    '-createdAt -updatedAt -token -password'
  );
  res.json(result);
};

module.exports = ctrlWrapper(getOneNotice);