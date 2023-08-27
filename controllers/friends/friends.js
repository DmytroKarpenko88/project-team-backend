const { HttpError } = require('../../helpers');
const { Friend } = require('../../models/friend');

const getFriends = async (req, res) => {
  const result = await Friend.find();

  if (!result) {
    throw HttpError(400, 'Not found friends');
  }

  //   const { title, url, addressUrl, imageUrl, address, workDays, phone, email } =
  //     result;

  res.status(200).json({
    code: 200,
    friends: [...result],
  });
};

module.exports = getFriends;
