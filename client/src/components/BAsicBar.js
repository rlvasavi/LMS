import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';

export default function BAsicBar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books/count-by-level');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchData();
  }, []);

  // Prepare the data for the BarChart
  const chartData = data.map(item => ({
    level: `Level ${item._id}`,
    count: item.count,
  }));

  return (
    <div>
      <h1>Level Counts</h1>
      <BarChart
        dataset={chartData}
        yAxis={[{ scaleType: 'band', dataKey: 'level' }]}
        series={[{ dataKey: 'count', label: 'Book Count' }]}
        layout="horizontal"
        width={400}
        height={200}
      />
    </div>
  );
}
