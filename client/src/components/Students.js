import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './Students.css';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState({});
  const [newStudentName, setNewStudentName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchStudents();
    fetchBooks();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/students');
      setStudents(response.data);
      setFilteredStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (studentId, bookId) => {
    try {
      const selectedBookObj = books.find(book => book._id === bookId);
      if (selectedBookObj.quantity === 0) {
        alert('Try again later. This book is currently out of stock.');
        return;
      }

      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async (studentId, checkoutId, bookId) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCurrentCheckIn = async (studentId, checkoutId, bookId) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/students/${studentId}/current/${checkoutId}`);

      // Update frontend to increase book quantity
      const updatedBooks = books.map(book => {
        if (book._id === bookId) {
          return { ...book, quantity: book.quantity + 1 }; // Assuming quantity field exists in your book object
        }
        return book;
      });
      setBooks(updatedBooks);

      // Refresh student list after deletion
      fetchStudents();
    } catch (error) {
      console.error('Error deleting current check-in:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookSelect = (event) => {
    setSelectedBook(event.target.value);
  };

  const toggleHistory = (studentId) => {
    setShowHistory(prevState => ({
      ...prevState,
      [studentId]: !prevState[studentId]
    }));
  };

  const handleAddStudent = async (event) => {
    event.preventDefault();
    if (!newStudentName) return;

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/students', { name: newStudentName });
      setNewStudentName('');
      fetchStudents();
    } catch (error) {
      console.error('Error adding student:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  if (loading) {
    return <p>Loading...</p>; // Display a loading indicator while data is being fetched
  }

  return (
    <div>
      <Navbar />
      <div className="add-student-form">
        <h4>Add Student:</h4>
        <form onSubmit={handleAddStudent}>
          <input
            type="text"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
            placeholder="Enter student name"
            disabled={loading}
          />
          <button type="submit" disabled={loading}>Add Student</button>
        </form>
      </div>
      <div className="search-student-form">
        <h4>Search Student:</h4>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by student name"
          disabled={loading}
        />
      </div>
      <h3 className="level-info">For Every 4 Checkouts Level Of Student Increases</h3>

      <div className="students-container">
        {filteredStudents.map((student) => (
          <div key={student._id} className="student-card">
            <h3>
              {student.name} (ID: {student._id}) - Level {student.level}
            </h3>
            <h4>Current Check In:</h4>
            <ul>
              {student.currentCheckIn.map((checkout) => (
                <li key={checkout._id}>
                  {checkout.book.bookName} ({checkout.book.author}){' '}
                  <button disabled={loading} onClick={() => handleCheckOut(student._id, checkout._id, checkout.book._id)}>
                    Check Out
                  </button>
                  <button disabled={loading} onClick={() => handleDeleteCurrentCheckIn(student._id, checkout._id, checkout.book._id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <h4>
              History Checkouts:
              <button onClick={() => toggleHistory(student._id)}>
                {showHistory[student._id] ? 'Hide' : 'Show'}
              </button>
            </h4>
            {showHistory[student._id] && (
              <ul>
                {student.historyCheckouts.map((historyCheckout) => (
                  <li key={historyCheckout._id}>
                    {historyCheckout.book.bookName} ({historyCheckout.book.author})
                  </li>
                ))}
              </ul>
            )}
            <h4>Check In Book:</h4>
            <select value={selectedBook} onChange={handleBookSelect} disabled={loading}>
              <option value="">Select a book to check in</option>
              {books.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.bookName} ({book.author})
                </option>
              ))}
            </select>
            <button onClick={() => handleCheckIn(student._id, selectedBook)} disabled={loading}>
              Check In
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
