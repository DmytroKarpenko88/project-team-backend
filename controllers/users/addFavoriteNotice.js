const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const addFavoriteNotice = async (req, res) => {
  console.log('addFavoriteNotice');
  const {_id: _owner} = req.user;
  const {idNotice} = req.params;

  const {favorites: listFavorites} = await User.findById(_owner, 'favorites');
  
  if (listFavorites.includes(idNotice)) {
    throw HttpError(401, 'This notice is already favorite');
  }

  const newFavorites = [...listFavorites, idNotice];

  const result = await User.findByIdAndUpdate(_owner, {
    favorites: newFavorites
  }, {
    new: true
  });
  res.json(result);
};

module.exports = addFavoriteNotice;