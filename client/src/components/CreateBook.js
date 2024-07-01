import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const CreateBook = () => {
  const [book, setBook] = useState({
    bookId: '',
    bookName: '',
    author: '',
    level: '',
    genre: '',
    quantity: '',
    location: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Book data:', book);
      const response = await axios.post('http://localhost:5000/api/books', book);
      console.log('Book added:', response.data);
      navigate('/books');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div>
      <Navbar/>
      <div style={styles.container}>
        <h2 style={styles.heading}>Add a New Book</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Book ID:
            <input type="number" name="bookId" value={book.bookId} onChange={handleChange} style={styles.input} required />
          </label>
          <label style={styles.label}>
            Book Name:
            <input type="text" name="bookName" value={book.bookName} onChange={handleChange} style={styles.input} required />
          </label>
          <label style={styles.label}>
            Author:
            <input type="text" name="author" value={book.author} onChange={handleChange} style={styles.input} required />
          </label>
          <label style={styles.label}>
            Level (1-6):
            <input type="number" name="level" value={book.level} onChange={handleChange} style={styles.input} min="1" max="6" required />
          </label>
          <label style={styles.label}>
            Genre:
            <input type="text" name="genre" value={book.genre} onChange={handleChange} style={styles.input} required />
          </label>
          <label style={styles.label}>
            Quantity:
            <input type="number" name="quantity" value={book.quantity} onChange={handleChange} style={styles.input} required />
          </label>
          <label style={styles.label}>
            Location:
            <input type="text" name="location" value={book.location} onChange={handleChange} style={styles.input} required />
          </label>
          <button type="submit" style={styles.button}>Add Book</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default CreateBook;
