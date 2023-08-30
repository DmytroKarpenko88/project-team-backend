const { Schema, model } = require('mongoose');
const { hendleMongooseError } = require('../helpers');

const Newchema = new Schema({
  imgUrl: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
  date: {
    type: String,
    default: null,
  },
  url: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    default: null,
  },
});

const New = model('new', Newchema);

Newchema.post('save', hendleMongooseError);

module.exports = { New };
