const Joi = require('joi');
const { Schema, model } = require('mongoose');
const { hendleMongooseError } = require('../helpers');
const regexp = require('../utils/regexp');

const userSchema = new Schema(
  {
    name: {
      type: String,
    },

    password: {
      type: String,
      minlength: 6,
      match: regexp.password,
      required: [true, 'Set password for user'],
    },

    email: {
      type: String,
      match: regexp.email,
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
      match: regexp.birthday,
      default: null,
    },
    phone: {
      type: String,
      match: regexp.phone,
      default: null,
    },
    city: {
      type: String,
      match: regexp.city,
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
  email: Joi.string().pattern(regexp.email).required(),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(regexp.password)
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
  email: Joi.string().pattern(regexp.email),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(regexp.email).required(),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(regexp.password)
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
  email: Joi.string().pattern(regexp.email),
  birthday: Joi.string().pattern(regexp.birthday),
  phone: Joi.string().pattern(regexp.phone),
  city: Joi.string().pattern(regexp.city),
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
