const { HttpError } = require('../../helpers');
const { Contact } = require('../../models/contact');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const searchParams = {
    owner,
  };

  // filter
  const favoriteCondition = favorite === 'true' || favorite === 'false';
  if (!favoriteCondition && favorite !== undefined) {
    throw HttpError(400, 'Wrong "favorite" query parameter');
  }
  if (favoriteCondition) {
    searchParams.favorite = favorite;
  }

  console.log(favoriteCondition, favorite);

  const result = await Contact.find(searchParams, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'email');
  res.json(result);
};

module.exports = getAll;
