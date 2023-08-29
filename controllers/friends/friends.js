const { HttpError } = require('../../helpers');
const { Friend } = require('../../models/friend');

const getFriends = async (req, res) => {
  const result = await Friend.find();

  if (!result) {
    throw HttpError(400, 'Not found friends');
  }

  res.status(200).json({
    code: 200,
    data: {
      friends: [...result],
    },
  });
};

module.exports = getFriends;
