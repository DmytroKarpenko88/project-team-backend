const Joi = require('joi');
const { isValid, parse } = require('date-fns');
const { Schema, model } = require('mongoose');
const { hendleMongooseError } = require('../helpers');

const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
const dateRegexp = /^\d{2}-\d{2}-\d{4}$/;
console.log('dateRegexp:', dateRegexp);

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
    // avatarURL: {
    //   type: String,
    //   required: true,
    // },
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
  birthday: Joi.string(),
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
