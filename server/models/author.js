const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number
})

//dont add id because mongoDb create unic id for every book

module.exports = mongoose.model('Author', authorSchema);
