const { User } = require("../../models/user");

const toggleFavoriteNotice = async (req, res) => {
  const {_id: _owner} = req.user;
  const {idNotice} = req.params;

  const {favorites: listFavorites} = await User.findById(_owner, 'favorites');

  const newFavorites = listFavorites.includes(idNotice)
    ? listFavorites.filter(item => item.toString() !== idNotice.toString())
    : [...listFavorites, idNotice];

  console.log('newFavorites: ', newFavorites);

  const result = await User.findByIdAndUpdate(_owner, {
    favorites: newFavorites
  }, {
    new: true
  });
  res.json(result);
};

module.exports = toggleFavoriteNotice;