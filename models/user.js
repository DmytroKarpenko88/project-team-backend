const Joi = require('joi');
const { Schema, model } = require('mongoose');
const { hendleMongooseError } = require('../helpers');

const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
const dateRegExp = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19\d\d|20\d\d)$/;

const phoneRegExp = /^\+38\(0\d{2}\)\d{3}-\d{2}-\d{2}$/;

const cityRegExp = /^[A-Z][A-Za-z\s]*$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
    },

    password: {
      type: String,
      minlength: 6,
      match: passwordRegexp,
      required: [true, 'Set password for user'],
    },

    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Email is required'],
      unique: true,
    },
    token: {
      type: String,
      default: '',
    },
    avatarURL: {
      type: String,
      default:
        'https://res.cloudinary.com/dtwrxerft/image/upload/v1692986384/Avatars/Photo_default_messyh.png',
    },
    birthday: {
      type: String,
      match: dateRegExp,
      default: null,
    },
    phone: {
      type: String,
      match: phoneRegExp,
      default: null,
    },
    city: {
      type: String,
      match: cityRegExp,
      default: null,
    },

    favorites: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', hendleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(passwordRegexp)
    .required()
    .messages({
      'string.base': 'Пароль повинен бути рядком',
      'string.min': 'Пароль повинен містити принаймні {#limit} символів',
      'string.max': 'Пароль не повинен перевищувати {#limit} символів',
      'string.pattern.base':
        'Пароль повинен містити принаймні 1 літеру верхнього регістру, 1 літеру нижнього регістру та 1 цифру',
      'any.required': 'Пароль є обовʼязковим полем',
    }),
});

const emailSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegexp),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(passwordRegexp)
    .required()
    .messages({
      'string.base': 'Пароль повинен бути рядком',
      'string.min': 'Пароль повинен містити принаймні {#limit} символів',
      'string.max': 'Пароль не повинен перевищувати {#limit} символів',
      'string.pattern.base':
        'Пароль повинен містити принаймні 1 літеру верхнього регістру, 1 літеру нижнього регістру та 1 цифру',
      'any.required': 'Пароль є обовʼязковим полем',
    }),
});

const ubdateProfileSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegexp),
  birthday: Joi.string().pattern(dateRegExp),
  phone: Joi.string().pattern(phoneRegExp),
  city: Joi.string().pattern(cityRegExp),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
  ubdateProfileSchema,
};

const User = model('user', userSchema);

module.exports = {
  schemas,
  User,
};
