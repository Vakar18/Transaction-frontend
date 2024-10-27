// src/components/StatisticsBox.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const StatisticsBox = ({ month }) => {
  const [statistics, setStatistics] = useState({ totalSaleAmount: 0, soldItems: 0, notSoldItems: 0 });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(`https://transaction-backend-93xd.onrender.com/api/statistics`, { params: { month } });
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching statistics", error);
      }
    };
    fetchStatistics();
  }, [month]);

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {[
        { label: "Total Sale Amount", value: `$${statistics.totalSaleAmount.toFixed(2)}` },
        { label: "Sold Items", value: statistics.soldItems },
        { label: "Not Sold Items", value: statistics.notSoldItems },
      ].map((stat, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary">
                {stat.label}
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatisticsBox;
