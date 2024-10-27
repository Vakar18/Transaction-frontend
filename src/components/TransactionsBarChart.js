// src/components/TransactionsBarChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, Typography, Box } from '@mui/material';

// Register required Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransactionsBarChart = ({ month }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await axios.get(`https://transaction-backend-93xd.onrender.com/api/barchart`, { params: { month } });
        setChartData({
          labels: response.data.map(item => item.range),
          datasets: [
            {
              label: 'Number of Transactions',
              data: response.data.map(item => item.count),
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching bar chart data", error);
      }
    };
    fetchBarChartData();
  }, [month]);

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          Transactions by Price Range
        </Typography>
        <Box
          sx={{
            position: 'relative',
            width: '100%', // Full width of the parent container
            maxWidth: '800px', // Limit the max width to avoid excessive stretching on large screens
            mx: 'auto', // Center the chart horizontally
            height: '400px', // Set the height explicitly for a balanced layout
          }}
        >
          {chartData ? (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: { type: 'category' },
                  y: { beginAtZero: true },
                },
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                  },
                  tooltip: {
                    enabled: true,
                  },
                },
              }}
            />
          ) : (
            <Typography>Loading chart data...</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TransactionsBarChart;
