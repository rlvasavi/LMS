// addStudents.js
///do not run this after one time or else dulipates will be created
const mongoose = require('mongoose');
const Student = require('./models/Student'); // Adjust the path as per your project structure

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  // Example students data
  const studentsData = [
    { name: 'John Doe', level: 1, currentCheckIn: [], historyCheckouts: [] },
    { name: 'Jane Smith', level: 1, currentCheckIn: [], historyCheckouts: [] },
    { name: 'Michael Johnson', level: 1, currentCheckIn: [], historyCheckouts: [] },
    { name: 'Emily Brown', level: 1, currentCheckIn: [], historyCheckouts: [] },
    { name: 'David Wilson', level: 1, currentCheckIn: [], historyCheckouts: [] },
    { name: 'Sarah Martinez', level: 1, currentCheckIn: [], historyCheckouts: [] },
    { name: 'Matthew Taylor', level: 1, currentCheckIn: [], historyCheckouts: [] },
    { name: 'Jessica Garcia', level: 1, currentCheckIn: [], historyCheckouts: [] },
    { name: 'Daniel Lopez', level: 1, currentCheckIn: [], historyCheckouts: [] },
    { name: 'Ashley Gonzalez', level: 1, currentCheckIn: [], historyCheckouts: [] }
  ];

  try {
    // Insert many students into the database
    const insertedStudents = await Student.insertMany(studentsData);
    console.log('Inserted students:', insertedStudents);
  } catch (error) {
    console.error('Error inserting students:', error);
  } finally {
    // Close the connection after adding students
    mongoose.connection.close();
  }
});
