const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
})

//dont add id because mongoDb create unic id for every book

module.exports = mongoose.model('Book', bookSchema);
