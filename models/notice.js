const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { hendleMongooseError } = require('../helpers');

const noticeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    sex: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'Sex is required'],
    },
    _category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: [true, '_category is required'],
    },
    photo: {
      type: String,
    },
    location: {
      type: String,
      required: [true, 'location is required'],
    },
    price: {
      type: Number,
    },
    birthday: {
      type: String,
      match: /^\d{2}\.\d{2}\.\d{4}$/,
      required: [true, 'birthday is required'],
    },
    type: {
      type: String,
      required: [true, 'type is required'],
    },
    describe: {
      type: String,
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

noticeSchema.post('save', hendleMongooseError);

const addNoticeSchema = Joi.object({
  title: Joi.string().required(),
  name: Joi.string().required(),
  sex: Joi.string().allow('male', 'female').required(),
  _category: Joi.string().required(),
  favorite: Joi.boolean(),
  photo: Joi.string(),
  location: Joi.string().required(),
  birthday: Joi.string()
    .pattern(/^\d{2}\.\d{2}\.\d{4}$/)
    .required(),
  type: Joi.string().required(),
  describe: Joi.string(),
});

const schemas = {
  addNoticeSchema,
};

const Notice = model('notice', noticeSchema);

module.exports = {
  schemas,
  Notice,
};
