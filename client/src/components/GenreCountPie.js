import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';

export default function GenreCountPie() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books/count-by-genre');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchData();
  }, []);

  // Prepare the data for the PieChart
  const chartData = data.map((item, index) => ({
    value: item.count,
    label: item._id,
    color: ['#e15759', '#76b7b2', '#4e79a7', '#f28e2b', '#59a14f', '#edc949'][index % 6], // Different colors
  }));

  return (
    <div>
      <h1>Genre Counts</h1>
      <PieChart
        series={[
          {
            data: chartData,
            color: chartData.map(item => item.color), // Apply colors
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
        labelPosition="bottom"
        width={400}
        height={200}
      />
    </div>
  );
}
