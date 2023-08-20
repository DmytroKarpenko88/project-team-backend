const {Schema, model} = require('mongoose');

const categoryList = [
  'Sell',
  'Lost/Found',
  'In good hands',
  'Favorite ads',
  'My ads',
];

const categorySchema = new Schema({
  title: {
    type: String,
    enum: categoryList,
    required: true,
  },
});

const Category = model('category', categorySchema);

module.exports = {
  Category,
};