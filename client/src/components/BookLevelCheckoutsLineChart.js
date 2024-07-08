import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts';
import axios from 'axios';

export default function BookLevelCheckoutsLineChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books/checkouts-by-level');
        const formattedData = response.data.map(item => ({
          level: item._id,
          count: item.count
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchData();
  }, []);

  // Prepare data for the LineChart
  const xData = data.map(item => item.level);
  const yData = data.map(item => item.count);

  return (
    <div>
      <h1>Book Checkouts by Level</h1>
      <LineChart
        xAxis={[{ data: xData }]}
        series={[
          {
            data: yData,
            color: '#e15759',
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
}
