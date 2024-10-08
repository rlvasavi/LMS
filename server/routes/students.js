const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Book = require('../models/Book'); // Ensure correct file name


router.get('/overdue', async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const students = await Student.aggregate([
      { $unwind: '$currentCheckIn' },
      { $match: { 'currentCheckIn.checkedOutAt': { $lte: sevenDaysAgo } } },
      {
        $lookup: {
          from: 'books',
          localField: 'currentCheckIn.book',
          foreignField: '_id',
          as: 'bookDetails'
        }
      },
      { $unwind: '$bookDetails' },
      {
        $project: {
          _id: 1,
          name: 1,
          level: 1,
          'currentCheckIn.checkedOutAt': 1,
          'bookDetails.bookName': 1
        }
      }
    ]);

    res.json(students);
  } catch (err) {
    console.error('Error fetching overdue students:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



router.get('/top5', async (req, res) => {
  try {
    const students = await Student.find().sort({ level: -1 }).limit(5).exec();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    level: 1, // Default level
    currentCheckIn: [],
    historyCheckouts: []
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all students with details
router.get('/', async (req, res) => {
  try {
    const students = await Student.find()
      .populate('currentCheckIn.book')
      .populate('historyCheckouts.book');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET details of a specific student by ID
router.get('/:id', getStudent, (req, res) => {
  res.json(res.student);
});

// POST check in a book for a student
router.post('/:id/checkin', getStudent, async (req, res) => {
  const bookId = req.body.bookId;

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.student.currentCheckIn.push({ book: book._id });
    await res.student.save();

    // Decrease book quantity
    if (book.quantity > 0) {
      book.quantity -= 1;
      await book.save();
    }

    res.json(res.student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE check out a book for a student (move to history and increment book quantity)
router.delete('/:id/checkout/:checkoutId', getStudent, async (req, res) => {
  const checkoutId = req.params.checkoutId;

  try {
    const checkoutIndex = res.student.currentCheckIn.findIndex(item => item._id == checkoutId);
    if (checkoutIndex === -1) return res.status(404).json({ message: 'Checkout item not found' });

    const checkout = res.student.currentCheckIn[checkoutIndex];
    res.student.currentCheckIn.splice(checkoutIndex, 1);
    res.student.historyCheckouts.push(checkout);

    // Check if history checkouts reach 4 and increment level if necessary
    if (res.student.historyCheckouts.length % 4 === 0) {
      res.student.level += 1;
    }

    await res.student.save();

    // Increase book quantity
    const book = await Book.findById(checkout.book);
    if (book) {
      book.quantity += 1;
      await book.save();
    }

    res.json(res.student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE current check-in of a student (remove without adding to history)
router.delete('/:id/current/:checkoutId', getStudent, async (req, res) => {
  const checkoutId = req.params.checkoutId;

  try {
    const checkoutIndex = res.student.currentCheckIn.findIndex(item => item._id == checkoutId);
    if (checkoutIndex === -1) return res.status(404).json({ message: 'Checkout item not found' });

    const checkout = res.student.currentCheckIn[checkoutIndex];
    res.student.currentCheckIn.splice(checkoutIndex, 1);

    await res.student.save();

    // Increase book quantity
    const book = await Book.findById(checkout.book);
    if (book) {
      book.quantity += 1;
      await book.save();
    }

    res.json(res.student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getStudent(req, res, next) {
  try {
    const student = await Student.findById(req.params.id)
      .populate('currentCheckIn.book')
      .populate('historyCheckouts.book');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.student = student;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}



module.exports = router;
