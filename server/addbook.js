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
    
      "bookId": 10,
      "bookName": "Junie B. Jones",
      "author": "Barbara Park",
      "level": 1,
      "genre": "Fiction",
      "quantity": 10,
      "location": "B4"
      },
      {
      "bookId": 11,
      "bookName": "Magic Tree House",
      "author": "Mary Pope Osborne",
      "level": 2,
      "genre": "Fiction",
      "quantity": 10,
      "location": "B5"
      },
      {
      "bookId": 12,
      "bookName": "Judy Moody",
      "author": "Megan McDonald",
      "level": 3,
      "genre": "Fiction",
      "quantity": 10,
      "location": "B6"
      },
      {
      "bookId": 13,
      "bookName": "Diary of a Wimpy Kid",
      "author": "Jeff Kinney",
      "level": 4,
      "genre": "Fiction",
      "quantity": 10,
      "location": "C1"
      },
      {
      "bookId": 14,
      "bookName": "Harry Potter and the Sorcerer's Stone",
      "author": "J.K. Rowling",
      "level": 5,
      "genre": "Fiction",
      "quantity": 10,
      "location": "C2"
      },
      {
      "bookId": 15,
      "bookName": "The Hunger Games",
      "author": "Suzanne Collins",
      "level": 6,
      "genre": "Fiction",
      "quantity": 10,
      "location": "C3"
      },
      {
      "bookId": 16,
      "bookName": "The Fault in Our Stars",
      "author": "John Green",
      "level": 1,
      "genre": "Fiction",
      "quantity": 10,
      "location": "C4"
      },
      {
      "bookId": 17,
      "bookName": "The Giver",
      "author": "Lois Lowry",
      "level": 2,
      "genre": "Fiction",
      "quantity": 10,
      "location": "C5"
      },
      {
      "bookId": 18,
      "bookName": "Divergent",
      "author": "Veronica Roth",
      "level": 3,
      "genre": "Fiction",
      "quantity": 10,
      "location": "C6"
      },
      {
      "bookId": 19,
      "bookName": "The Maze Runner",
      "author": "James Dashner",
      "level": 4,
      "genre": "Fiction",
      "quantity": 10,
      "location": "D1"
      },
      {
      "bookId": 20,
      "bookName": "The Book Thief",
      "author": "Markus Zusak",
      "level": 5,
      "genre": "Fiction",
      "quantity": 10,
      "location": "D2"
      },
      {
      "bookId": 21,
      "bookName": "The Graveyard Book",
      "author": "Neil Gaiman",
      "level": 6,
      "genre": "Fiction",
      "quantity": 10,
      "location": "D3"
      },
      {
      "bookId": 22,
      "bookName": "The Outsiders",
      "author": "S.E. Hinton",
      "level": 5,
      "genre": "Fiction",
      "quantity": 10,
      "location": "D4"
      },
      {
      "bookId": 23,
      "bookName": "The Perks of Being a Wallflower",
      "author": "Stephen Chbosky",
      "level": 4,
      "genre": "Fiction",
      "quantity": 10,
      "location": "D5"
      },
      {
      "bookId": 24,
      "bookName": "The Hate U Give",
      "author": "Angie Thomas",
      "level": 3,
      "genre": "Fiction",
      "quantity": 10,
      "location": "D6"
      },
      {
      "bookId": 25,
      "bookName": "Eleanor & Park",
      "author": "Rainbow Rowell",
      "level": 2,
      "genre": "Fiction",
      "quantity": 10,
      "location": "E1"
      },
      {
      "bookId": 26,
      "bookName": "The Kite Runner",
      "author": "Khaled Hosseini",
      "level": 1,
      "genre": "Fiction",
      "quantity": 10,
      "location": "E2"
      },
      {
      "bookId": 27,
      "bookName": "The Book of Joy",
      "author": "Dalai Lama, Desmond Tutu",
      "level": 2,
      "genre": "Non-Fiction",
      "quantity": 10,
      "location": "E3"
      },
      {
      "bookId": 28,
      "bookName": "Born a Crime",
      "author": "Trevor Noah",
      "level": 1,
      "genre": "Non-Fiction",
      "quantity": 10,
      "location": "E4"
      },
      {
      "bookId": 29,
      "bookName": "Educated",
      "author": "Tara Westover",
      "level": 1,
      "genre": "Non-Fiction",
      "quantity": 10,
      "location": "E5"
      },
      {
      "bookId": 30,
      "bookName": "The Immortal Life of Henrietta Lacks",
      "author": "Rebecca Skloot",
      "level": 2,
      "genre": "Non-Fiction",
      "quantity": 10,
      "location": "E6"
      },
      {
      "bookId": 31,
      "bookName": "Unbroken",
      "author": "Laura Hillenbrand",
      "level": 2,
      "genre": "Non-Fiction",
      "quantity": 10,
      "location": "F1"
      },
      {
      "bookId": 32,
      "bookName": "The Devil in the White City",
      "author": "Erik Larson",
      "level": 3,
      "genre": "Non-Fiction",
      "quantity": 10,
      "location": "F2"
      },
      {
      "bookId": 33,
      "bookName": "The Omnivore's Dilemma",
      "author": "Michael Pollan",
      "level": 4,
      "genre": "Non-Fiction",
      "quantity": 10,
      "location": "F3"
      },
      {
      "bookId": 34,
      "bookName": "Guns, Germs, and Steel",
      "author": "Jared Diamond",
      "level": 5,
      "genre": "Non-Fiction",
      "quantity": 10,
      "location": "F4"
      },
      {
      "bookId": 35,
      "bookName": "Sapiens",
      "author": "Yuval Noah Harari",
      "level": 6,
      "genre": "Non-Fiction",
      "quantity": 10,
      "location": "F5"
      },
      {
      "bookId": 36,
      "bookName": "The Power of Habit",
      "author": "Charles Duhigg",
      "level": 3,
      "genre": "Non-Fiction",
      "quantity": 10,
      "location": "F6"
      },
      {
      "bookId": 37,
      "bookName": "Daring Greatly",
      "author": "Brené Brown",
      "level": 4,
      "genre": "Non-Fiction",
      "quantity": 10,
      "location": "G1"
      },
      {
      "bookId": 38,
      "bookName": "The Life-Changing Magic of Tidying Up",
      "author": "Marie Kondo",
      "level": 2,
      "genre": "Non-Fiction",
      "quantity": 10,
      "location": "G2"
      },
      {
      "bookId": 39,
      "bookName": "The 7 Habits of Highly Effective People",
      "author": "Stephen R. Covey",
      "level": 1,
      "genre": "Non-Fiction",
      "quantity": 10,
      "location": "G3"
      },
      {
      "bookId": 40,
      "bookName": "Atomic Habits",
      "author": "James Clear",
      "level": 1,
      "genre": "Non-Fiction",
      "quantity": 10,
      "location": "G4"
      }
    
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
