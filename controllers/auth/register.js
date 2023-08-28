const bcrypt = require('bcryptjs');
const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  newUser.token = token;

  newUser.save();

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      token,
    },
  });
};

module.exports = register;
