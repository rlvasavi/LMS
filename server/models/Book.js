// models/book.js

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookId: { type: Number, required: true, unique: true },
  bookName: { type: String, required: true },
  author: { type: String, required: true },
  level: { type: Number, required: true, min: 1, max: 6 },
  genre: { type: String, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
