// StudentDetails.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentDetails = ({ match }) => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/students/${match.params.id}`);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudentDetails();
  }, [match.params.id]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Student Details</h2>
      <p>Name: {student.name}</p>
      <p>ID: {student._id}</p>
      <p>Level: {student.level}</p>
      <h3>Current Check In:</h3>
      <ul>
        {student.currentCheckIn.map((checkout) => (
          <li key={checkout._id}>
            {checkout.book.bookName} ({checkout.book.author})
          </li>
        ))}
      </ul>
      {/* Add more details as needed */}
    </div>
  );
};

export default StudentDetails;
