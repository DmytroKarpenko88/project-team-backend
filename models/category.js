const {Schema, model} = require('mongoose');

const categoryList = [
  'Sell',
  'Lost/Found',
  'In good hands',
  'Favorite ads',
  'My ads',
];

const codeList = [
  'sell',
  'lost_found',
  'in_good_hands',
  'favorite_ads',
  'my_ads',
];

const categorySchema = new Schema({
  title: {
    type: String,
    enum: categoryList,
    required: true,
  },
  code: {
    type: String,
    enum: codeList,
    required: true,
  }
});

const Category = model('category', categorySchema);

module.exports = {
  Category,
};