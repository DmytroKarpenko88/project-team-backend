const { Notice } = require("../../models/notice");
const { User } = require("../../models/user");

const getFavoriteNotices = async (req, res) => {
  const {_id: _owner} = req.user;

  const {favorites: listFavorites} = await User.findById(_owner, 'favorites');
  
  const result = await Notice.find(
    {_id: {$in: listFavorites}}
  ).populate(
    '_owner',
    '-createdAt -updatedAt -token -password -favorites'
  );

  res.json(result);
};

module.exports = getFavoriteNotices;