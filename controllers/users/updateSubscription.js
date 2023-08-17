const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const body = req.body;

  if (!body) {
    throw HttpError(400, 'missing field favorite');
  }

  const result = await User.findByIdAndUpdate(_id, body, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  const { name, email, subscription } = result;
  res.status(200).json({ name, email, subscription });
};

module.exports = updateSubscription;
