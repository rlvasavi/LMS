import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function TopStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/students/top5');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching the students', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
    <h3>Top Students</h3>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Level</TableCell>
            <TableCell align="right">Current Check-In Count</TableCell>
            <TableCell align="right">History Checkouts Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student._id}>
              <TableCell component="th" scope="row">
                {student.name}
              </TableCell>
              <TableCell align="right">{student.level}</TableCell>
              <TableCell align="right">{student.currentCheckIn.length}</TableCell>
              <TableCell align="right">{student.historyCheckouts.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
