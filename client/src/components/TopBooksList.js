import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';

export default function TopBooksList() {
  const [topBooks, setTopBooks] = useState([]);

  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books/top-5');
        setTopBooks(response.data);
      } catch (error) {
        console.error('Error fetching the top books', error);
      }
    };

    fetchTopBooks();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Top 5 Books by Checkouts 
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="Top 5 Books">
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>Book Name</TableCell>
              <TableCell align="right">Checkout Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topBooks.map((book, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell align="right">{book.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
