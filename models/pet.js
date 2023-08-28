const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { hendleMongooseError } = require('../helpers');

// const cityRegExp = /^[A-Z][A-Za-z\s]*$/;

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19\d\d|20\d\d)$/;

const PetSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },

    birthday: {
      type: String,
      match: dateRegex,
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
  name: Joi.string().required(),
  birthday: Joi.string().pattern(dateRegex).required(),
  type: Joi.string().required(),
  describe: Joi.string(),
});

const schemas = {
  addPetSchema,
};

const Pet = model('pet', PetSchema);

module.exports = {
  schemas,
  Pet,
};
