const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { hendleMongooseError } = require('../helpers');
const regexp = require('../utils/regexp');

const PetSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },

    birthday: {
      type: String,
      match: regexp.birthday,
      required: [true, 'birthday is required'],
    },

    type: {
      type: String,
      minlength: 2,
      maxlength: 16,
      required: [true, 'type is required'],
    },

    petURL: {
      type: String,
      default: null,
      required: true,
    },

    describe: {
      type: String,
      maxlength: 120,
    },

    _owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

PetSchema.post('save', hendleMongooseError);

const addPetSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'The "Name" field must be a string',
    'any.required': 'The "Name" field is required',
  }),
  birthday: Joi.string().pattern(regexp.birthday).required().messages({
    'string.base': 'The "Birthday" field must be a string',
    'string.pattern.base':
      'Enter a valid date of birth in the format DD-MM-YYYY',
    'any.required': 'The "Birthday" field is required',
  }),
  type: Joi.string().required().messages({
    'string.base': 'The "Type" field must be a string',
    'any.required': 'The "Type" field is required',
  }),
  describe: Joi.string().max(120).messages({
    'string.base': 'The "Description" field must be a string',
    'string.max': 'Description must not exceed {#limit} characters',
  }),
});

const schemas = {
  addPetSchema,
};

const Pet = model('pet', PetSchema);

module.exports = {
  schemas,
  Pet,
};
