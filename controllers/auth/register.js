const bcrypt = require('bcryptjs');
const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  // const verificationCode = nanoid();
  // const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    // verificationCode,
    // verificationToken,
  });

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};

module.exports = register;

// const verifyEmail = {
//   to: email,
//   subject: 'verify email',
//   html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
// };

// await sendEmail(verifyEmail);
