// addBooks.js

const mongoose = require('mongoose');
const Book = require('./models/Book'); // Adjust path as per your project structure

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/jp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample books data
const sampleBooks = [
  {
    bookId: 1,
    bookName: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    level: 1,
    genre: 'Fiction',
    quantity: 10,
    location: 'A1'
  },
  {
    bookId: 2,
    bookName: '1984',
    author: 'George Orwell',
    level: 2,
    genre: 'Dystopian Fiction',
    quantity: 8,
    location: 'A2'
  },
  {
    bookId: 3,
    bookName: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    level: 1,
    genre: 'Classic Literature',
    quantity: 12,
    location: 'B1'
  },
  {
    bookId: 4,
    bookName: 'Pride and Prejudice',
    author: 'Jane Austen',
    level: 1,
    genre: 'Romantic Fiction',
    quantity: 15,
    location: 'B2'
  },
  {
    bookId: 5,
    bookName: 'Brave New World',
    author: 'Aldous Huxley',
    level: 3,
    genre: 'Science Fiction',
    quantity: 6,
    location: 'C1'
  },
  {
    bookId: 6,
    bookName: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    level: 2,
    genre: 'Coming-of-age Fiction',
    quantity: 10,
    location: 'C2'
  },
  {
    bookId: 7,
    bookName: 'Lord of the Flies',
    author: 'William Golding',
    level: 2,
    genre: 'Adventure Fiction',
    quantity: 8,
    location: 'D1'
  },
  {
    bookId: 8,
    bookName: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    level: 3,
    genre: 'Fantasy',
    quantity: 10,
    location: 'D2'
  },
  {
    bookId: 9,
    bookName: 'Moby-Dick',
    author: 'Herman Melville',
    level: 3,
    genre: 'Adventure Fiction',
    quantity: 7,
    location: 'E1'
  },
  // Add more books here as needed
];

// Function to seed the database with sample books
const seedDatabase = async () => {
  try {
    await Book.deleteMany(); // Clear existing books
    await Book.insertMany(sampleBooks); // Insert sample books
    console.log('Sample books added successfully!');
    mongoose.connection.close(); // Close MongoDB connection
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.connection.close(); // Close MongoDB connection on error
  }
};

// Run the seed function
seedDatabase();
