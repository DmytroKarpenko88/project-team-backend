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
  name: Joi.string().required().messages({
    'string.base': 'The "Name" field must be a string',
    'any.required': 'The "Name" field is required',
  }),
  email: Joi.string().pattern(regexp.email).required().messages({
    'string.base': 'The "Email" field must be a string',
    'string.pattern.base': 'Enter a valid email address',
    'any.required': 'The "Email" field is required',
  }),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(regexp.password)
    .required()
    .messages({
      'string.base': 'The "Password" field must be a string',
      'string.min': 'Password must be at least {#limit} characters long',
      'string.max': 'Password must not exceed {#limit} characters',
      'string.pattern.base':
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 digit',
      'any.required': 'The "Password" field is required',
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(regexp.email).required().messages({
    'string.base': 'The "Email" field must be a string',
    'string.pattern.base': 'Enter a valid email address',
    'any.required': 'The "Email" field is required',
  }),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(regexp.password)
    .required()
    .messages({
      'string.base': 'The "Password" field must be a string',
      'string.min': 'Password must be at least {#limit} characters long',
      'string.max': 'Password must not exceed {#limit} characters',
      'string.pattern.base':
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 digit',
      'any.required': 'The "Password" field is required',
    }),
});

const updateProfileSchema = Joi.object({
  name: Joi.string().messages({
    'string.base': 'The "Name" field must be a string',
  }),
  email: Joi.string().pattern(regexp.email).messages({
    'string.base': 'The "Email" field must be a string',
    'string.pattern.base': 'Enter a valid email address',
  }),
  birthday: Joi.string().pattern(regexp.birthday).messages({
    'string.pattern.base':
      'Enter a valid date of birth in the format DD-MM-YYYY',
  }),
  phone: Joi.string().pattern(regexp.phone).messages({
    'string.pattern.base':
      'Enter a valid phone number in the format +38(0XX)XXX-XX-XX',
  }),
  city: Joi.string().pattern(regexp.city).messages({
    'string.pattern.base': 'Enter a city name starting with a capital letter',
  }),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
};

const User = model('user', userSchema);

module.exports = {
  schemas,
  User,
};
