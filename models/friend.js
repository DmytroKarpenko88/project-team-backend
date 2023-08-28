const { Schema, model } = require('mongoose');

const { hendleMongooseError } = require('../helpers');

const FriendsSchema = new Schema({
  title: {
    type: String,
    default: null,
  },

  url: {
    type: String,
    default: null,
  },

  addressUrl: {
    type: String,
    default: null,
  },

  imageUrl: {
    type: String,
    default: null,
  },

  address: {
    type: String,
    default: null,
  },

  workDays: {
    type: Array,
    default: null,
  },

  phone: {
    type: Number,
    default: null,
  },

  email: {
    type: String,
    default: null,
  },
});

FriendsSchema.post('save', hendleMongooseError);

const Friend = model('friend', FriendsSchema);

module.exports = { Friend };
