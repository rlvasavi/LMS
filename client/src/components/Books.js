import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const styles = {
  container: {
    padding: '20px',
    maxWidth: '100%',
    margin: '0 auto',
    backgroundSize: 'cover',
  },
  addButton: {
    marginBottom: '20px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    border: '1px solid black',
  },
  th: {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
  },
  td: {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
  },
  levelCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelButton: {
    marginLeft: '10px',
    padding: '5px 10px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  navbar: {
    width: '100%',
  },
};

const Books = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then(response => {
        const sortedBooks = response.data.sort((a, b) => a.bookId - b.bookId); // Sort books by bookId
        setBooks(sortedBooks);
      })
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const deleteBook = (id) => {
    axios.delete(`http://localhost:5000/api/books/${id}`)
      .then(() => {
        setBooks(books.filter(book => book._id !== id));
      })
      .catch(error => console.error('Error deleting book:', error));
  };

  const updateBookLevel = (id, newLevel) => {
    axios.patch(`http://localhost:5000/api/books/${id}/level`, { level: newLevel })
      .then(response => {
        const updatedBooks = books.map(book => book._id === id ? response.data : book);
        setBooks(updatedBooks);
      })
      .catch(error => console.error('Error updating book level:', error));
  };

  const goToAddBook = () => {
    navigate('/createbook');
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <Navbar />
      </div>
      <button onClick={goToAddBook} style={styles.addButton}>Add Book</button>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Book ID</th>
            <th style={styles.th}>Book Name</th>
            <th style={styles.th}>Author</th>
            <th style={styles.th}>Level</th>
            <th style={styles.th}>Genre</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Location</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book._id}>
              <td style={styles.td}>{book.bookId}</td>
              <td style={styles.td}>{book.bookName}</td>
              <td style={styles.td}>{book.author}</td>
              <td style={{ ...styles.td, ...styles.levelCell }}>
                {book.level}
                <button onClick={() => updateBookLevel(book._id, book.level + 1)} style={styles.levelButton}>Increase</button>
                <button onClick={() => updateBookLevel(book._id, book.level - 1)} style={styles.levelButton}>Decrease</button>
              </td>
              <td style={styles.td}>{book.genre}</td>
              <td style={styles.td}>{book.quantity}</td>
              <td style={styles.td}>{book.location}</td>
              <td style={styles.td}>
                <button onClick={() => deleteBook(book._id)} style={styles.deleteButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
