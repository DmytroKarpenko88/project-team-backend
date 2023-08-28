const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { hendleMongooseError } = require('../helpers');

// const cityRegExp = /^[A-Z][A-Za-z\s]*$/;

const dateRegExp =
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

const PetSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },

    birthday: {
      type: String,
      match: /^\d{2}\.\d{2}\.\d{4}$/,
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
  birthday: Joi.string().pattern(dateRegExp).required(),
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
