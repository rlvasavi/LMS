import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './Students.css';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchBooks();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleCheckIn = async (studentId, bookId) => {
    try {
      // Call backend to check in book
      await axios.post(`http://localhost:5000/students/${studentId}/checkin`, { bookId });
  
      // Update frontend to decrease book quantity
      const updatedBooks = books.map(book => {
        if (book._id === bookId) {
          return { ...book, quantity: book.quantity - 1 }; // Assuming quantity field exists in your book object
        }
        return book;
      });
      setBooks(updatedBooks);
  
      // Refresh student list after check-in
      fetchStudents();
    } catch (error) {
      console.error('Error checking in book:', error);
    }
  };
  

  const handleCheckOut = async (studentId, checkoutId, bookId) => {
    try {
      // Call backend to check out book
      await axios.delete(`http://localhost:5000/students/${studentId}/checkout/${checkoutId}`);

      // Update frontend to increase book quantity
      const updatedBooks = books.map(book => {
        if (book._id === bookId) {
          return { ...book, quantity: book.quantity + 1 }; // Assuming quantity field exists in your book object
        }
        return book;
      });
      setBooks(updatedBooks);

      // Refresh student list after checkout
      fetchStudents();
    } catch (error) {
      console.error('Error checking out book:', error);
    }
  };

  const handleBookSelect = (event) => {
    setSelectedBook(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <h2>All Students</h2>
      <div className="students-container">
        {students.map((student) => (
          <div key={student._id} className="student-card">
            <h3>
              {student.name} (ID: {student._id}) - Level {student.level}
            </h3>
            <h4>Current Check In:</h4>
            <ul>
              {student.currentCheckIn.map((checkout) => (
                <li key={checkout._id}>
                  {checkout.book.bookName} ({checkout.book.author}){' '}
                  <button onClick={() => handleCheckOut(student._id, checkout._id, checkout.book._id)}>
                    Check Out
                  </button>
                </li>
              ))}
            </ul>
            <h4>History Checkouts:</h4>
            <ul>
              {student.historyCheckouts.map((historyCheckout) => (
                <li key={historyCheckout._id}>
                  {historyCheckout.book.bookName} ({historyCheckout.book.author})
                </li>
              ))}
            </ul>
            <h4>Check In Book:</h4>
            <select value={selectedBook} onChange={handleBookSelect}>
              <option value="">Select a book to check in</option>
              {books.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.bookName} ({book.author})
                </option>
              ))}
            </select>
            <button onClick={() => handleCheckIn(student._id, selectedBook)}>Check In</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
