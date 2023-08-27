const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');

const updateProfile = async (req, res) => {
  const { _id } = req.user;
  const body = req.body;

  if (!body) {
    throw HttpError(400, 'missing field favorite');
  }

  const data = req.file ? { ...body, avatarURL: req.file.path } : { ...body };

  const result = await User.findByIdAndUpdate(_id, data, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  const { name, email, birthday, phone, city, avatarURL } = result;
  res.status(200).json({
    code: 200,
    data: {
      avatarURL,
      name,
      email,
      birthday,
      phone,
      city,
    },
  });
};

module.exports = updateProfile;
