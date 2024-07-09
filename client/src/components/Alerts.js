import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Navbar from './Navbar';

export default function Alerts() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchOverdueStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/students/overdue');
        const studentsWithOverdueDays = response.data.map(student => {
          const checkedOutAt = new Date(student.currentCheckIn.checkedOutAt);
          const today = new Date();
          const diffTime = Math.abs(today - checkedOutAt);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const overdueDays = diffDays - 7;
          return {
            ...student,
            overdueDays
          };
        }).filter(student => student.overdueDays > 0);
        setStudents(studentsWithOverdueDays);
      } catch (error) {
        console.error('Error fetching overdue students', error);
      }
    };

    fetchOverdueStudents();
  }, []);

  return (
    <div>
        <div><Navbar/></div>
      <Typography variant="h4" gutterBottom>
        Students Overdue Books List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Book Name</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Checked Out At</TableCell>
              <TableCell>Overdue Days</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={student._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.bookDetails.bookName}</TableCell>
                <TableCell>{student.level}</TableCell>
                <TableCell>{new Date(student.currentCheckIn.checkedOutAt).toLocaleDateString()}</TableCell>
                <TableCell>{student.overdueDays}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
