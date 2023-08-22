const Joi = require('joi');
const { isValid, parse } = require('date-fns');
const { Schema, model } = require('mongoose');
const { hendleMongooseError } = require('../helpers');

const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

const dateRegExp =
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

const phoneRegExp = /^(\+380\d{9})$/;

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
      required: true,
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
  email: Joi.string().pattern(emailRegexp).required(),
  birthday: Joi.string().pattern(dateRegExp).required(),
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
